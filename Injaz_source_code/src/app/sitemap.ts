import { MetadataRoute } from 'next'
 
export default function sitemap(): MetadataRoute.Sitemap {
    const baseURL = 'https://injazrent.ae';
  return [
    {
      url: baseURL,
      lastModified: new Date(),
    },
    {
      url: baseURL + '/user/membership',
      lastModified: new Date(),
    },
    {
      url: baseURL + '/user/landing_page/car_with_location?location=Abu%20Dhabi',
      lastModified: new Date(),
    },
    {
      url: baseURL + '/user/landing_page/car-with-category?category=ECONOMY',
      lastModified: new Date(),
    },
    {
      url: baseURL + '/user/landing_page/car-with-category?category=HATCHBACK',
      lastModified: new Date(),
    },
    {
      url: baseURL + '/user/landing_page/car-with-category?category=SUV',
      lastModified: new Date(),
    },
    {
      url: baseURL + '/user/landing_page/car-with-category?category=SEDAN',
      lastModified: new Date(),
    },
    {
      url: baseURL + '/user/landing_page/car-with-category?category=COMPACT',
      lastModified: new Date(),
    },
    {
      url: baseURL + '/user/landing_page/car-with-category?category=LUXURY',
      lastModified: new Date(),
    },
    {
      url: baseURL + '/user/landing_page/car-with-category?category=CROSSOVER',
      lastModified: new Date(),
    },
    {
      url: baseURL + '/user/landing_page/car_with_location?brand=KIA',
      lastModified: new Date(),
    },
    {
      url: baseURL + '/user/landing_page/car_with_location?brand=HYUNDAI',
      lastModified: new Date(),
    },
    {
      url: baseURL + '/user/landing_page/car_with_location?brand=NISSAN',
      lastModified: new Date(),
    },
    {
      url: baseURL + '/user/landing_page/car_with_location?brand=MITSUBISHI',
      lastModified: new Date(),
    },
    {
      url: baseURL + '/user/landing_page/car_with_location?brand=MAZDA',
      lastModified: new Date(),
    },
    {
      url: baseURL + '/user/landing_page/car_with_location?brand=TOYOTA',
      lastModified: new Date(),
    },
    {
      url: baseURL + '/user/landing_page/car_with_location?brand=MERCEDES',
      lastModified: new Date(),
    },
  ]
}