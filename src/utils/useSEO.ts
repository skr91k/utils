import { useEffect } from 'react';

interface SEOProps {
  title: string;
  description: string;
  keywords?: string;
}

export const useSEO = ({ title, description, keywords }: SEOProps) => {
  useEffect(() => {
    // Update document title
    document.title = `${title} | Utility Kit`;

    // Helper to update or create meta tags
    const updateMetaTag = (name: string, content: string, isProperty = false) => {
      const attr = isProperty ? 'property' : 'name';
      let metaTag = document.querySelector(`meta[${attr}="${name}"]`) as HTMLMetaElement;
      if (!metaTag) {
        metaTag = document.createElement('meta');
        metaTag.setAttribute(attr, name);
        document.head.appendChild(metaTag);
      }
      metaTag.content = content;
    };

    // Standard meta tags
    updateMetaTag('description', description);
    if (keywords) {
      updateMetaTag('keywords', keywords);
    }

    // Open Graph tags
    updateMetaTag('og:title', title, true);
    updateMetaTag('og:description', description, true);
    updateMetaTag('og:type', 'website', true);

    // Twitter Card tags
    updateMetaTag('twitter:card', 'summary');
    updateMetaTag('twitter:title', title);
    updateMetaTag('twitter:description', description);

    // Cleanup on unmount
    return () => {
      document.title = 'Utility Kit';
    };
  }, [title, description, keywords]);
};
