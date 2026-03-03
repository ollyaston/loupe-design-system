import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../design-system/form";
import { Input } from "../../design-system/input";
import { Button } from "../../design-system/button";
import { Textarea } from "../../design-system/textarea";
import { Select } from "../../design-system/select";
import { Checkbox } from "../../design-system/checkbox";
import { Switch } from "../../design-system/switch";
import { RadioGroup } from "../../design-system/radio-group";
import { Slider } from "../../design-system/slider";
import { Search } from "../../design-system/search";
import { Combobox } from "../../design-system/combobox";
import { MultiSelectCombobox } from "../../design-system/multi-select-combobox";
import {
  DropdownMenuWrapper,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownButtonTrigger,
} from "../../design-system/dropdown-menu";
import { Heading } from "../../design-system/heading";
import { Container } from "@/components/layouts/container";

const meta: Meta<typeof Form> = {
  component: Form,
  parameters: {
    docs: {
      description: {
        component:
          "A form component built with React Hook Form and Radix UI primitives.",
      },
    },
  },
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <Container className="p-4">
        <Story />
      </Container>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Form>;

// Form validation schema
const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  bio: z.string().min(10, {
    message: "Bio must be at least 10 characters.",
  }),
  role: z.string({
    required_error: "Please select a role.",
  }),
  terms: z.boolean().refine((val) => val === true, {
    message: "You must accept the terms and conditions.",
  }),
});

// Simple form schema
const simpleSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
});

export const Default: Story = {
  render: () => {
    const form = useForm<z.infer<typeof formSchema>>({
      resolver: zodResolver(formSchema),
      defaultValues: {
        username: "",
        email: "",
        bio: "",
        role: "",
        terms: false,
      },
    });

    function onSubmit(values: z.infer<typeof formSchema>) {
      console.log(values);
    }

    return (
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder="shadcn" {...field} />
                </FormControl>
                <FormDescription>
                  This is your public display name.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="m@example.com" {...field} />
                </FormControl>
                <FormDescription>
                  We&apos;ll never share your email with anyone else.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="bio"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Bio</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Tell us a little bit about yourself"
                    className="resize-none"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  You can @mention other users and organizations.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="role"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Role</FormLabel>
                <FormControl>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    placeholder="Select role..."
                    options={[
                      { value: "admin", label: "Admin" },
                      { value: "user", label: "User" },
                      { value: "moderator", label: "Moderator" },
                    ]}
                  />
                </FormControl>
                <FormDescription>
                  You can manage notifications in your settings.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="terms"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>Accept terms and conditions</FormLabel>
                  <FormDescription>
                    You agree to our Terms of Service and Privacy Policy.
                  </FormDescription>
                </div>
              </FormItem>
            )}
          />
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    );
  },
};

export const SimpleForm: Story = {
  render: () => {
    const form = useForm<z.infer<typeof simpleSchema>>({
      resolver: zodResolver(simpleSchema),
      defaultValues: {
        name: "",
        email: "",
      },
    });

    function onSubmit(values: z.infer<typeof simpleSchema>) {
      console.log(values);
    }

    return (
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    );
  },
};

export const WithValidationErrors: Story = {
  render: () => {
    const form = useForm<z.infer<typeof formSchema>>({
      resolver: zodResolver(formSchema),
      defaultValues: {
        username: "a", // This will trigger validation error
        email: "invalid-email", // This will trigger validation error
        bio: "short", // This will trigger validation error
        role: "",
        terms: false,
      },
    });

    function onSubmit(values: z.infer<typeof formSchema>) {
      console.log(values);
    }

    return (
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder="shadcn" {...field} />
                </FormControl>
                <FormDescription>
                  This is your public display name.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="m@example.com" {...field} />
                </FormControl>
                <FormDescription>
                  We&apos;ll never share your email with anyone else.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="bio"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Bio</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Tell us a little bit about yourself"
                    className="resize-none"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  You can @mention other users and organizations.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    );
  },
};

export const ContactForm: Story = {
  render: () => {
    const contactSchema = z.object({
      firstName: z.string().min(1, "First name is required"),
      lastName: z.string().min(1, "Last name is required"),
      email: z.string().email("Invalid email address"),
      message: z.string().min(10, "Message must be at least 10 characters"),
    });

    const form = useForm<z.infer<typeof contactSchema>>({
      resolver: zodResolver(contactSchema),
      defaultValues: {
        firstName: "",
        lastName: "",
        email: "",
        message: "",
      },
    });

    function onSubmit(values: z.infer<typeof contactSchema>) {
      console.log(values);
    }

    return (
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>First name</FormLabel>
                  <FormControl>
                    <Input placeholder="John" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Last name</FormLabel>
                  <FormControl>
                    <Input placeholder="Doe" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="john.doe@example.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Message</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Tell us how we can help you..."
                    className="resize-none"
                    rows={4}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full">
            Send message
          </Button>
        </form>
      </Form>
    );
  },
};

export const AllComponentsErrorStates: Story = {
  render: () => {
    const form = useForm({
      defaultValues: {
        input: "Invalid input",
        textarea: "Short text",
        select: "",
        checkbox: false,
        switch: false,
        radioGroup: "",
        slider: [25],
        search: "Invalid search",
        combobox: "",
      },
    });

    function onSubmit(values: any) {
      console.log(values);
    }

    return (
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          {/* Input with Error */}
          <FormField
            control={form.control}
            name="input"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email address</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter your email"
                    error={true}
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Please enter a valid email address
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Textarea with Error */}
          <FormField
            control={form.control}
            name="textarea"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Message</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Type your message here..."
                    error={true}
                    className="resize-none"
                    rows={4}
                    {...field}
                  />
                </FormControl>
                <FormDescription>Please enter a valid message</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Select with Error */}
          <FormField
            control={form.control}
            name="select"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Country</FormLabel>
                <FormControl>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    placeholder="Select country..."
                    error
                    options={[
                      { value: "us", label: "United States" },
                      { value: "ca", label: "Canada" },
                      { value: "mx", label: "Mexico" },
                      { value: "uk", label: "United Kingdom" },
                    ]}
                  />
                </FormControl>
                <FormDescription>Please select a valid country</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Checkbox with Error */}
          <FormField
            control={form.control}
            name="checkbox"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    error={true}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>Accept terms and conditions</FormLabel>
                  <FormDescription>
                    You must accept the terms to continue
                  </FormDescription>
                </div>
              </FormItem>
            )}
          />

          {/* Switch with Error */}
          <FormField
            control={form.control}
            name="switch"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Enable notifications</FormLabel>
                <FormControl>
                  <div className="flex items-center space-x-2">
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      error={true}
                    />
                    <FormDescription>
                      You must enable notifications to continue
                    </FormDescription>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Radio Group with Error */}
          <FormField
            control={form.control}
            name="radioGroup"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Payment method</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    error={true}
                    choices={[
                      {
                        value: "credit",
                        children: (
                          <FormLabel htmlFor="credit">Credit card</FormLabel>
                        ),
                      },
                      {
                        value: "debit",
                        children: (
                          <FormLabel htmlFor="debit">Debit card</FormLabel>
                        ),
                      },
                      {
                        value: "paypal",
                        children: (
                          <FormLabel htmlFor="paypal">PayPal</FormLabel>
                        ),
                      },
                    ]}
                  />
                </FormControl>
                <FormDescription>
                  Please select a valid payment method
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Slider with Error */}
          <FormField
            control={form.control}
            name="slider"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Volume level</FormLabel>
                <FormControl>
                  <Slider
                    value={field.value}
                    onValueChange={field.onChange}
                    max={100}
                    step={1}
                    className="w-full"
                    error={true}
                  />
                </FormControl>
                <FormDescription>
                  Please set a valid volume level
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Search with Error */}
          <FormField
            control={form.control}
            name="search"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Search query</FormLabel>
                <FormControl>
                  <Search
                    placeholder="Search for something..."
                    error={true}
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Please enter a valid search query
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Combobox with Error */}
          <FormField
            control={form.control}
            name="combobox"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Framework</FormLabel>
                <FormControl>
                  <Combobox
                    options={[
                      { value: "next.js", label: "Next.js" },
                      { value: "react", label: "React" },
                      { value: "vue", label: "Vue" },
                      { value: "angular", label: "Angular" },
                    ]}
                    placeholder="Select framework..."
                    searchPlaceholder="Search framework..."
                    emptyText="No results found."
                    error={true}
                    value={field.value}
                    onValueChange={field.onChange}
                  />
                </FormControl>
                <FormDescription>
                  Please select a valid framework
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit">Submit form</Button>
        </form>
      </Form>
    );
  },
};

export const TwoColumnForm: Story = {
  render: () => {
    const twoColumnSchema = z.object({
      firstName: z.string().min(1, "First name is required"),
      lastName: z.string().min(1, "Last name is required"),
      email: z.string().email("Invalid email address"),
      phone: z.string().min(10, "Phone number must be at least 10 digits"),
      company: z.string().min(1, "Company is required"),
      jobTitle: z.string().min(1, "Job title is required"),
      department: z.string().min(1, "Department is required"),
      manager: z.string().min(1, "Manager is required"),
      startDate: z.string().min(1, "Start date is required"),
      salary: z.string().min(1, "Salary is required"),
      address: z.string().min(10, "Address must be at least 10 characters"),
      city: z.string().min(1, "City is required"),
      state: z.string().min(1, "State is required"),
      zipCode: z.string().min(5, "Zip code must be at least 5 characters"),
      country: z.string().min(1, "Country is required"),
      emergencyContact: z.string().min(1, "Emergency contact is required"),
      emergencyPhone: z
        .string()
        .min(10, "Emergency phone must be at least 10 digits"),
      notes: z.string().optional(),
    });

    const form = useForm<z.infer<typeof twoColumnSchema>>({
      resolver: zodResolver(twoColumnSchema),
      defaultValues: {
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        company: "",
        jobTitle: "",
        department: "",
        manager: "",
        startDate: "",
        salary: "",
        address: "",
        city: "",
        state: "",
        zipCode: "",
        country: "",
        emergencyContact: "",
        emergencyPhone: "",
        notes: "",
      },
    });

    function onSubmit(values: z.infer<typeof twoColumnSchema>) {
      console.log(values);
    }

    return (
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          {/* Personal Information Section */}
          <div className="space-y-6">
            <Heading
              title="Personal information"
              description="Basic personal details"
              size="section"
              as="h3"
            />

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>First name</FormLabel>
                    <FormControl>
                      <Input placeholder="John" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Last name</FormLabel>
                    <FormControl>
                      <Input placeholder="Doe" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="john.doe@company.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone</FormLabel>
                    <FormControl>
                      <Input placeholder="(555) 123-4567" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          {/* Work Information Section */}
          <div className="space-y-6">
            <Heading
              title="Work information"
              description="Employment details"
              size="section"
              as="h3"
            />

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
              <FormField
                control={form.control}
                name="company"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Company</FormLabel>
                    <FormControl>
                      {/* eslint-disable-next-line agent-loupe-ui/sentence-case */}
                      <Input placeholder="Acme Corp" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="jobTitle"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Job title</FormLabel>
                    <FormControl>
                      <Input placeholder="Software engineer" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="department"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Department</FormLabel>
                    <FormControl>
                      <Input placeholder="Engineering" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="manager"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Manager</FormLabel>
                    <FormControl>
                      <Input placeholder="Jane Smith" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="startDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Start date</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="salary"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Salary</FormLabel>
                    <FormControl>
                      <Input placeholder="$75,000" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          {/* Address Information Section */}
          <div className="space-y-6">
            <Heading
              title="Address information"
              description="Home address details"
              size="section"
              as="h3"
            />

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem className="lg:col-span-2">
                    <FormLabel>Address</FormLabel>
                    <FormControl>
                      <Input placeholder="123 Main Street, Apt 4B" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="city"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>City</FormLabel>
                    <FormControl>
                      <Input placeholder="San Francisco" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="state"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>State</FormLabel>
                    <FormControl>
                      <Input placeholder="CA" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="zipCode"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Zip code</FormLabel>
                    <FormControl>
                      <Input placeholder="94105" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="country"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Country</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        placeholder="Select country..."
                        options={[
                          { value: "us", label: "United States" },
                          { value: "ca", label: "Canada" },
                          { value: "mx", label: "Mexico" },
                          { value: "uk", label: "United Kingdom" },
                          { value: "de", label: "Germany" },
                          { value: "fr", label: "France" },
                        ]}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          {/* Emergency Contact Section */}
          <div className="space-y-6">
            <Heading
              title="Emergency contact"
              description="Emergency contact information"
              size="section"
              as="h3"
            />

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
              <FormField
                control={form.control}
                name="emergencyContact"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Emergency contact name</FormLabel>
                    <FormControl>
                      <Input placeholder="Jane Doe" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="emergencyPhone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Emergency contact phone</FormLabel>
                    <FormControl>
                      <Input placeholder="(555) 987-6543" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          {/* Additional Notes Section */}
          <div className="space-y-6">
            <Heading
              title="Additional information"
              description="Any additional notes or comments"
              size="section"
              as="h3"
            />

            <FormField
              control={form.control}
              name="notes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Notes</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Any additional information or special requirements..."
                      className="resize-none"
                      rows={4}
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Optional: Add any additional information that might be
                    relevant
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="flex justify-end space-x-4 pt-6">
            <Button type="button" variant="outline">
              Cancel
            </Button>
            <Button type="submit">Submit application</Button>
          </div>
        </form>
      </Form>
    );
  },
};

export const DropdownComponentsComparison: Story = {
  render: () => {
    const form = useForm({
      defaultValues: {
        select: "",
        combobox: "",
        multiSelectCombobox: [],
      },
    });

    const options = [
      { value: "option1", label: "Option 1" },
      { value: "option2", label: "Option 2" },
      { value: "option3", label: "Option 3" },
      { value: "option4", label: "Option 4" },
      { value: "option5", label: "Option 5" },
    ];

    return (
      <Form {...form}>
        <div className="space-y-8">
          <Heading
            title="Dropdown components comparison"
            description="All dropdown components with consistent styling (shadows, arrows, chevrons)"
            size="section"
            as="h2"
          />
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            {/* Select */}
            <FormField
              control={form.control}
              name="select"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Select</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      value={field.value}
                      placeholder="Select..."
                      options={options}
                    />
                  </FormControl>
                  <FormDescription>
                    Standard select dropdown with keyboard_arrow_down icon
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Combobox */}
            <FormField
              control={form.control}
              name="combobox"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Combobox</FormLabel>
                  <FormControl>
                    <Combobox
                      options={options}
                      value={field.value}
                      onValueChange={field.onChange}
                      placeholder="Select..."
                      searchPlaceholder="Search..."
                      emptyText="No results found."
                    />
                  </FormControl>
                  <FormDescription>
                    Searchable combobox with keyboard_arrow_down icon
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* MultiSelectCombobox */}
            <FormField
              control={form.control}
              name="multiSelectCombobox"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Multi-Select Combobox</FormLabel>
                  <FormControl>
                    <MultiSelectCombobox
                      options={options}
                      values={field.value || []}
                      onValuesChange={field.onChange}
                      placeholder="Select options..."
                      searchPlaceholder="Search..."
                      emptyText="No results found."
                    />
                  </FormControl>
                  <FormDescription>
                    Multi-select combobox with keyboard_arrow_down icon
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* DropdownMenu */}
            <FormItem>
              <FormLabel>Dropdown menu</FormLabel>
              <FormControl>
                <DropdownMenuWrapper>
                  <DropdownButtonTrigger variant="outline" showArrow>
                    Open menu
                  </DropdownButtonTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuLabel>My account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>Profile</DropdownMenuItem>
                    <DropdownMenuItem>Billing</DropdownMenuItem>
                    <DropdownMenuItem>Settings</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>Log out</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenuWrapper>
              </FormControl>
              <FormDescription>
                Dropdown menu with keyboard_arrow_down icon (when showArrow is
                true)
              </FormDescription>
            </FormItem>
          </div>
        </div>
      </Form>
    );
  },
};
