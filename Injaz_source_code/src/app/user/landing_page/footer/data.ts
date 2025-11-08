const handleInstagramClick = () => {
    window.open("https://www.instagram.com/logicrent/", "_blank");
  };
  const handleFacebookClick = () => {
    window.open(
      "https://www.facebook.com/people/LOGIC-RENT-A-CAR/61550608379423/",
      "_blank"
    );
  };
  const handleTwitterClick = () => {
    window.open("https://twitter.com/", "_blank");
  };
  const handleLinkedInClick = () => {
    window.open("https://www.linkedin.com/company/logic-rent-a-car/", "_blank");
  };
  const handleGoogleClick = () => {
    window.open("https://g.co/kgs/R2eYUtp", "_blank");
  };

export const socialMediaLinks = [
   
    {
      src: "/socialmediawebp (1).webp",
      alt: "google",
      onClick: handleGoogleClick,
    },
    {
      src: "/socialmediawebp (4).webp",
      alt: "instagram",
      onClick: handleInstagramClick,
    },
    {
      src: "/twitter newwebp.webp",
      alt: "twitter",
      onClick: handleTwitterClick,
    },
    {
      src: "/socialmediawebp (3).webp",
      alt: "linkedin",
      onClick: handleLinkedInClick,
    },
  ];

  export const cities = ["Dubai", "Abu Dhabi", "Sharjah", "Ajman", "Fujairah"];

  export const legal = [
    "Terms & Conditions",
    "Privacy Policy",
  ];

  export const scrollToSection = (sectionId: any) => {
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
      const offset = targetSection.offsetTop - 100;
      window.scrollTo({ top: offset, behavior: "smooth" });
    }
  };
  interface MenuItem {
    label: string;
    sectionId?: string;
  }

  export const menuItems: MenuItem[] = [
    { label: "Home", sectionId: "mainNavbar" },
    { label: "Service", sectionId: "carWithCategoryID" },
    { label: "About Us", sectionId: "about_us" },
    { label: "Contact Us", sectionId: "contact_us" },
    { label: "FAQs", sectionId: "accordion" },
  ];

  export const dailyWeeklyButton = [
    {
      name: "Daily",
      route: "daily=daily",
      subs: "dailyAndWeekly",
    },
    {
      name: "Weekly",
      route: "weekly=weekly",
      subs: "dailyAndWeekly",
    },
    {
      name: "Monthly",
      route: "monthly=monthly",
      subs: "monthly",
    },
  ];