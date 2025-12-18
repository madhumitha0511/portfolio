
import React, { useState, useEffect } from 'react';
// ========== 6. FOOTER SECTION ==========
export const Footer = () => {
  const [owner, setOwner] = useState(null);

  useEffect(() => {
    const fetchOwner = async () => {
      try {
        const res = await portfolioAPI.getOwner();
        setOwner(res.data);
      } catch (err) {
        console.error('Error fetching owner:', err);
      }
    };
    fetchOwner();
  }, []);

  return (
    <footer className="bg-black border-t border-slate-700 py-12 px-4">
      <div className="max-w-6xl mx-auto text-center text-slate-400">
       
        <div className="flex justify-center gap-4 mb-4">
          {owner?.github_url && (
            <a
              href={owner.github_url}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-400 transition"
            >
              GitHub
            </a>
          )}
          {owner?.linkedin_url && (
            <a
              href={owner.linkedin_url}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-400 transition"
            >
              LinkedIn
            </a>
          )}
          {owner?.email && (
            <a
              href={`mailto:${owner.email}`}
              className="hover:text-blue-400 transition"
            >
              Email
            </a>
          )}
        </div>
        <p className="text-sm">© 2024 All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;