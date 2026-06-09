import { useEffect } from 'react';
import { driver } from 'driver.js';
import 'driver.js/dist/driver.css';

export const useOnboardingTour = () => {
  useEffect(() => {
    const hasVisited = localStorage.getItem('hasVisited');
    if (!hasVisited) {
      const driverObj = driver({
        showProgress: true,
        steps: [
          { element: '.hero-section', popover: { title: 'Welcome!', description: 'Transform your data with our AI engine.' } },
          { element: '.demo-upload', popover: { title: 'Live Demo', description: 'Drop your files here to start processing.' } },
          { element: '.pricing-section', popover: { title: 'Pricing', description: 'Choose the plan that fits your business.' } },
        ],
      });

      // Wait a bit for components to render
      setTimeout(() => {
        driverObj.drive();
        localStorage.setItem('hasVisited', 'true');
      }, 1000);
    }
  }, []);
};
