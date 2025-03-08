const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-gray-400 text-sm py-4">
      <div className="container mx-auto text-center">
        <p>
          © {new Date().getFullYear()} Brewology Vault. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
