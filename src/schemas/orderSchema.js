export const orderSchema = z.object({
  type: z.enum(["food", "parcel", "grocery", "other"], {
    errorMap: () => ({ message: "Please select a delivery category" }),
  }),
  serviceType: z.enum(["immediate", "scheduled"]),
  scheduledFor: z.string().nullable(),
  priority: z.enum(["normal", "high", "critical"]),

  sender: z.object({
    name: z.string().min(1, "Enter the sender's name"),
    phone: z.string().min(10, "Enter a valid Afghan phone number"),
  }),

  receiver: z.object({
    name: z.string().min(1, "Recipient's name is required"),
    phone: z.string().min(10, "Recipient's phone number is required"),
    address: z.string().min(5, "Please provide a specific delivery address"),
  }),

  pickupLocation: z.object({
    type: z.literal("Point"),
    coordinates: z.array(z.number()).length(2, "Please pin the pickup location on the map"),
  }),

  dropoffLocation: z.object({
    type: z.literal("Point"),
    coordinates: z.array(z.number()).length(2, "Please pin the drop-off location on the map"),
  }),

  items: z.array(z.object({
    name: z.string().min(1, "Item name cannot be empty"),
    quantity: z.number().min(1, "Quantity must be at least 1"),
    unitPrice: z.number().optional(),
    total: z.number().optional()
  })).optional(),

  packageDetails: z.object({
    weight: z.number().min(0.1, "Weight must be greater than 0").optional(),
    size: z.enum(["small", "medium", "large"]).optional(),
    fragile: z.boolean().default(false),
    note: z.string().max(200, "Note is too long").optional()
  }).optional(),

  paymentType: z.enum(["online", "COD"], {
    errorMap: () => ({ message: "Select a payment method" }),
  }),
  
  amountToCollect: z.number().min(0, "Amount cannot be negative").optional(),

  deliveryPrice: z.object({
    total: z.number().min(0, "Delivery price missing"),
  }),
  
  finalPrice: z.number().min(1, "Total price is required"),
  driverId: z.string().nullable().default(null),
})
.refine((data) => {
  if (data.serviceType === "scheduled" && !data.scheduledFor) return false;
  return true;
}, {
  message: "Please select a date and time for your scheduled delivery",
  path: ["scheduledFor"],
})
.refine((data) => {
  if ((data.type === "food" || data.type === "grocery") && (!data.items || data.items.length === 0)) {
    return false;
  }
  return true;
}, {
  message: "Please add at least one item for this order type",
  path: ["items"],
})
.refine((data) => {
  if (data.type === "parcel" && !data.packageDetails) {
    return false;
  }
  return true;
}, {
  message: "Please add the package details",
  path: ["packageDetails"] 
})
.refine((data) => {
  if (data.type === "parcel" && (!data.packageDetails?.weight || data.packageDetails.weight <= 0)) {
    return false;
  }
  return true;
}, {
  message: "Weight is required for parcel deliveries",
  path: ["packageDetails", "weight"], 
})
.refine((data) => {
  if (data.type === "parcel" && !data.packageDetails?.size) {
    return false;
  }
  return true;
}, {
  message: "Please select a package size",
  path: ["packageDetails", "size"], 
})