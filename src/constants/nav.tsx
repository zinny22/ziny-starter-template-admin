
import {
  Home,
  User,
  ShoppingCart,
  Package,
  Tags,
  Ticket,
  Megaphone,
  MessageCircle,
} from "lucide-react";

export const navData = [
  {
    title: "Dashboard",
    url: "/",
    icon: <Home className="size-6" />,
    isActive: true,
    items: [
      {
        title: "Dashboard",
        url: "/",
        icon: <Home />,
      },
    ],
  },
  {
    title: "Customers",
    url: "/customers",
    icon: <User />,
    items: [
      {
        title: "Customers",
        url: "/customers",
        icon: <User />,
      },
    ],
  },
  {
    title: "Orders",
    url: "/orders",
    icon: <ShoppingCart />,
    items: [
      {
        title: "Orders",
        url: "/orders",
        icon: <ShoppingCart />,
      },
      {
        title: "Reviews",
        url: "/orders/reviews",
        icon: <MessageCircle />,
        isActive: true,
      },
    ],
  },
  {
    title: "Products",
    url: "/products",
    icon: <Package />,
    items: [
      {
        title: "Products",
        url: "/products",
        icon: <Package />,
      },
      {
        title: "Categories",
        url: "/products/categories",
        icon: <Tags />,
      },
    ],
  },
  {
    title: "Promotions",
    url: "/promotions",
    icon: <ShoppingCart />,
    items: [
      {
        title: "Coupons",
        url: "/promotions/coupons",
        icon: <Ticket />,
      },
      {
        title: "Campaigns",
        url: "/promotions/campaigns",
        icon: <Megaphone />,
      },
    ],
  },
];