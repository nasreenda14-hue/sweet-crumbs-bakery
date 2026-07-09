import React from 'react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  
  const socialLinks = [
    {
      name: 'Facebook',
      href: 'https://facebook.com', 
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
        </svg>
      ),
    },
   
    {
  name: 'Instagram',
  href: 'https://instagram.com', 
  icon: (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
      <path fillRule="evenodd" d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" clipRule="evenodd" />
    </svg>
  ),
},
     {
  name: 'TikTok',
  href: 'https://tiktok.com', 
  icon: (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.01 1.62 4.14.94 1.05 2.27 1.72 3.69 1.9v3.91c-1.28-.04-2.54-.45-3.61-1.18-.73-.5-1.34-1.16-1.78-1.94V14.5c.07 2.11-.79 4.19-2.37 5.57-1.8 1.62-4.43 2.17-6.73 1.43-2.31-.72-4.08-2.73-4.57-5.11-.6-2.82.74-5.74 3.25-7.07 1.34-.72 2.89-.9 4.38-.55v4.01c-.81-.29-1.71-.23-2.48.2-.9.5-1.46 1.48-1.45 2.51-.01 1.29.8 2.45 2.04 2.82 1.25.38 2.63-.12 3.32-1.21.28-.43.41-.93.39-1.44V.02z" />
    </svg>
  ),
}

  ];

  return (
    <footer className="bg-gray-900 text-gray-300 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        
       
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-8 border-b border-gray-800">
          
       
          <div className="space-y-4">
            <span className="text-xl font-bold text-white tracking-wide">
              Sweet Crumbs Bakery
            </span>
            <p className="text-sm text-gray-400 max-w-sm">
              Freshly Baked with Love Every Day.
            </p>
          </div>

         
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-white tracking-wider uppercase">
              Contact Us
            </h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li className="flex items-center space-x-2">
                <span className="text-indigo-400 font-medium">Email:</span>
                <a href="hello@sweetcrumbsbakery.com" className="hover:text-indigo-400 transition-colors">hello@sweetcrumbsbakery.com</a>
              </li>
              <li className="flex items-center space-x-2">
                <span className="text-indigo-400 font-medium">Phone:</span>
                <a href="tel:+1(555)123-4567" className="hover:text-indigo-400 transition-colors">+1 (555) 123-4567</a>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-indigo-400 font-medium whitespace-nowrap">HQ:</span>
                <span>123 Maple Street<br/> Springfield,IL 62701 <br/>USA</span>
              </li>
            </ul>
          </div>

        
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-white tracking-wider uppercase">
              Follow Us
            </h3>
            <p className="text-sm text-gray-400">
              Stay updated with our latest open source projects and milestones.
            </p>
          
            <div className="flex space-x-4 pt-1">
              {socialLinks.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="p-2 bg-gray-800 rounded-md text-gray-400 hover:text-white hover:bg-indigo-600 transition-all duration-200"
                  aria-label={item.name}
                >
                  {item.icon}
                </a>
              ))}
            </div>
          </div>

        </div>

      
        <div className="mt-8 flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0 text-xs text-gray-500">
          <p>&copy; {currentYear} Sweet Crumbs Bakery Inc. All rights reserved.</p>
          <div className="flex space-x-6">
            <a href="#" className="hover:text-gray-400 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-gray-400 transition-colors">Terms of Service</a>
          </div>
        </div>

      </div>
    </footer>
  );
}
