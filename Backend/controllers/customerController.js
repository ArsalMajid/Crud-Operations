import Customer from "../models/Customer.js";

// export const getCustomers = async (req, res) => {
//   try {
//     const customers = await Customer.find().populate('assignedTo', 'name email');
//     res.json(customers);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

export const getCustomers = async (req, res) => {
  try {
    const customers = await Customer.find().populate(
      "assignedTo",
      "name email"
    );
    res.json(customers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createCustomer = async (req, res) => {
  const { name, email, company, assignedTo } = req.body;
  try {
    const customer = await Customer.create({
      name,
      email,
      company,
      assignedTo,
    });
    res.status(201).json(customer);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const updateCustomer = async (req, res) => {
  try {
    const customer = await Customer.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(customer);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteCustomer = async (req, res) => {
  try {
    await Customer.findByIdAndDelete(req.params.id);
    res.json({ message: "Customer deleted" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};