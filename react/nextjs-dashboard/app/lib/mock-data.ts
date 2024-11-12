import {
  CustomerField,
  Customer,
  Invoice,
  CustomersTableType,
  InvoiceForm,
  InvoicesTable,
  LatestInvoiceRaw,
  Revenue,
} from "./definitions";
import { formatCurrency } from "./utils";
import {
  users as usersData,
  customers as customersData,
  invoices as invoicesData,
  revenue as revenueData,
} from "./placeholder-data";

export async function fetchRevenue() {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return revenueData;
}

export async function fetchLatestInvoices() {
  await new Promise((resolve) => setTimeout(resolve, 2000));

  let invoices = invoicesData;
  // get the latest 5 invoices
  invoices = invoices.slice(0, 5);
  // get the customer details for each invoice
  const customers = customersData;
  const latestInvoices = invoices.map((invoice: Invoice) => {
    const customer = getInvoiceCustomer(invoice, customers);
    return {
      id: invoice.id,
      name: customer?.name ?? "",
      image_url: customer?.image_url ?? "",
      email: customer?.email ?? "",
      amount: formatCurrency(invoice.amount),
    };
  });

  return latestInvoices;
}

function getInvoiceCustomer(invoice: Invoice, customers: Customer[]) {
  return customers.find((customer) => customer.id === invoice.customer_id);
}

export async function fetchCardData() {
  await new Promise((resolve) => setTimeout(resolve, 2000));
  const invoice = invoicesData;
  const customer = customersData;

  const numberOfCustomers = customer.length;
  const numberOfInvoices = invoice.length;
  let totalPaidInvoicesAmount = invoice.reduce((total, invoice) => {
    return invoice.status === "paid" ? total + invoice.amount : total;
  }, 0);
  const totalPaidInvoices = formatCurrency(totalPaidInvoicesAmount);

  let totalPendingInvoicesAmount = invoice.reduce((total, invoice) => {
    return invoice.status === "pending" ? total + invoice.amount : total;
  }, 0);
  const totalPendingInvoices = formatCurrency(totalPendingInvoicesAmount);

  return {
    numberOfCustomers,
    numberOfInvoices,
    totalPaidInvoices,
    totalPendingInvoices,
  };
}

const ITEMS_PER_PAGE = 6;
export async function fetchFilteredInvoices(
  query: string,
  currentPage: number
) {
  
  await new Promise((resolve) => setTimeout(resolve, 2000));

  let invoices = invoicesData;
  const customers = customersData;
  const fullInvoices = invoices.map((invoice: Invoice) => {
    const customer = getInvoiceCustomer(invoice, customers);
    return {
      id: invoice.id,
      amount: invoice.amount,
      date: invoice.date,
      status: invoice.status,
      name: customer?.name ?? "",
      image_url: customer?.image_url ?? "",
      email: customer?.email ?? "",
    };
  });

  // Filter invoices by query
  const filteredInvoices = fullInvoices.filter((invoice) => {
    return (
      invoice.name.toLowerCase().includes(query.toLowerCase()) ||
      invoice.email.toLowerCase().includes(query.toLowerCase()) ||
      String(invoice.amount).includes(query) ||
      invoice.date.includes(query) ||
      invoice.status.includes(query)
    );
  });

  // Paginate invoices
  const start = (currentPage - 1) * ITEMS_PER_PAGE;
  const end = start + ITEMS_PER_PAGE;
  const paginatedInvoices = filteredInvoices.slice(start, end);

  return paginatedInvoices;
}

export async function fetchInvoicesPages(query: string) {
  try {
    const count = await sql`SELECT COUNT(*)
    FROM invoices
    JOIN customers ON invoices.customer_id = customers.id
    WHERE
      customers.name ILIKE ${`%${query}%`} OR
      customers.email ILIKE ${`%${query}%`} OR
      invoices.amount::text ILIKE ${`%${query}%`} OR
      invoices.date::text ILIKE ${`%${query}%`} OR
      invoices.status ILIKE ${`%${query}%`}
  `;

    const totalPages = Math.ceil(Number(count.rows[0].count) / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch total number of invoices.");
  }
}

export async function fetchInvoiceById(id: string) {
  try {
    const data = await sql<InvoiceForm>`
      SELECT
        invoices.id,
        invoices.customer_id,
        invoices.amount,
        invoices.status
      FROM invoices
      WHERE invoices.id = ${id};
    `;

    const invoice = data.rows.map((invoice) => ({
      ...invoice,
      // Convert amount from cents to dollars
      amount: invoice.amount / 100,
    }));

    return invoice[0];
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch invoice.");
  }
}

export async function fetchCustomers() {
  try {
    const data = await sql<CustomerField>`
      SELECT
        id,
        name
      FROM customers
      ORDER BY name ASC
    `;

    const customers = data.rows;
    return customers;
  } catch (err) {
    console.error("Database Error:", err);
    throw new Error("Failed to fetch all customers.");
  }
}

export async function fetchFilteredCustomers(query: string) {
  try {
    const data = await sql<CustomersTableType>`
		SELECT
		  customers.id,
		  customers.name,
		  customers.email,
		  customers.image_url,
		  COUNT(invoices.id) AS total_invoices,
		  SUM(CASE WHEN invoices.status = 'pending' THEN invoices.amount ELSE 0 END) AS total_pending,
		  SUM(CASE WHEN invoices.status = 'paid' THEN invoices.amount ELSE 0 END) AS total_paid
		FROM customers
		LEFT JOIN invoices ON customers.id = invoices.customer_id
		WHERE
		  customers.name ILIKE ${`%${query}%`} OR
        customers.email ILIKE ${`%${query}%`}
		GROUP BY customers.id, customers.name, customers.email, customers.image_url
		ORDER BY customers.name ASC
	  `;

    const customers = data.rows.map((customer) => ({
      ...customer,
      total_pending: formatCurrency(customer.total_pending),
      total_paid: formatCurrency(customer.total_paid),
    }));

    return customers;
  } catch (err) {
    console.error("Database Error:", err);
    throw new Error("Failed to fetch customer table.");
  }
}
