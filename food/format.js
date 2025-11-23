const fs = require('fs');

function formatTable(inputFile, outputFile) {
    // Read the file
    const data = fs.readFileSync(inputFile, 'utf8');
    const lines = data.split('\n');
    
    const formattedLines = [];
    let currentDiner = '';
    
    for (let i = 0; i < lines.length; i++) {
        const line = lines[i].trim();
        
        // Skip empty lines
        if (!line) continue;
        
        // Check if this is a header line (contains "Diner")
        if (line.includes('Diner') && line.includes('Date')) {
            formattedLines.push(line);
            continue;
        }
        
        const columns = line.split('\t');
        
        // If first column contains a name (has letters and doesn't start with a number)
        if (columns[0] && /[a-zA-Z]/.test(columns[0]) && !/^\d/.test(columns[0].trim())) {
            currentDiner = columns[0];
            formattedLines.push(line);
        } else {
            // This line is missing the diner name, fill it in
            const formattedLine = currentDiner + '\t' + line;
            formattedLines.push(formattedLine);
        }
    }
    
    // Write the formatted data to output file
    const result = formattedLines.join('\n');
    fs.writeFileSync(outputFile, result);
    
    console.log(`Formatted table saved to ${outputFile}`);
    return result;
}

function outputMealByDay(formatResult) {
    const lines = formatResult.split('\n');
    const mealData = [];
    
    // Parse the formatted data
    for (let i = 1; i < lines.length; i++) { // Skip header
        const line = lines[i].trim();
        if (!line) continue;
        
        const columns = line.split('\t');
        if (columns.length >= 3) {
            const diner = columns[0];
            const dateStr = columns[1];
            const meal = columns[2];
            
            // Parse date (format: "02 Dec 2025")
            const date = new Date(dateStr);
            
            mealData.push({
                diner: diner,
                date: date,
                meal: meal
            });
        }
    }
    
    // Get unique diners
    const diners = [...new Set(mealData.map(item => item.diner))];
    
    // Find the earliest date and calculate the nearest Monday
    const dates = mealData.map(item => item.date);
    const earliestDate = new Date(Math.min(...dates));
    
    // Find the nearest Monday (Monday = 1)
    const dayOfWeek = earliestDate.getDay();
    const nearestMonday = new Date(earliestDate);
    nearestMonday.setDate(earliestDate.getDate() - (dayOfWeek === 0 ? 6 : dayOfWeek - 1));
    
    // Generate 10 work days (2 weeks, Monday to Friday)
    const workDays = [];
    const currentDate = new Date(nearestMonday);
    
    for (let week = 0; week < 2; week++) {
        for (let day = 0; day < 5; day++) { // Monday to Friday
            workDays.push(new Date(currentDate));
            currentDate.setDate(currentDate.getDate() + 1);
        }
        currentDate.setDate(currentDate.getDate() + 2); // Skip weekend
    }
    
    // Create meal schedule for each diner
    const results = [];
    
    diners.forEach(diner => {
        const dinerMeals = mealData.filter(item => item.diner === diner);
        
        workDays.forEach(workDay => {
            const meal = dinerMeals.find(item => 
                item.date.toDateString() === workDay.toDateString()
            );
            
            const dateStr = workDay.toLocaleDateString('en-GB', {
                day: '2-digit',
                month: 'short',
                year: 'numeric'
            });
            
            results.push(`${diner}\t${dateStr}\t${meal ? meal.meal : '-'}`);
        });
    });
    
    // Write to file
    const header = 'Diner\tDate\tMeal';
    const output = [header, ...results].join('\n');
    fs.writeFileSync('meal_schedule.txt', output);
    
    console.log('Meal schedule saved to meal_schedule.txt');
    console.log(`Generated ${results.length} rows (${diners.length} diners × 10 work days)`);
    
    return results;
}

function transformToDateDinerFormat(mealScheduleResults) {
    // Parse the meal schedule results
    const scheduleData = [];
    
    mealScheduleResults.forEach(row => {
        const columns = row.split('\t');
        if (columns.length >= 3) {
            scheduleData.push({
                diner: columns[0],
                date: columns[1],
                meal: columns[2]
            });
        }
    });
    
    // Get unique dates and diners
    const dates = [...new Set(scheduleData.map(item => item.date))];
    const diners = [...new Set(scheduleData.map(item => item.diner))];
    
    // Create the transformed table
    const transformedResults = [];
    
    dates.forEach(date => {
        const row = [date];
        
        diners.forEach(diner => {
            const mealEntry = scheduleData.find(item => 
                item.date === date && item.diner === diner
            );
            row.push(mealEntry ? mealEntry.meal : '-');
        });
        
        transformedResults.push(row.join('\t'));
    });
    
    // Create header
    const header = ['Date', ...diners].join('\t');
    const output = [header, ...transformedResults].join('\n');
    
    // Write to file
    fs.writeFileSync('meal_by_date.txt', output);
    
    console.log('Transformed meal schedule saved to meal_by_date.txt');
    console.log(`Generated ${transformedResults.length} rows (10 work days)`);
}

// Usage
const inputFile = process.argv[2] || 'sample.txt';
const outputFile = process.argv[3] || 'formatted_sample.txt';

try {
    const formatResult = formatTable(inputFile, outputFile);
    const mealScheduleResults = outputMealByDay(formatResult);
    transformToDateDinerFormat(mealScheduleResults);
} catch (error) {
    console.error('Error processing file:', error.message);
}