// src/components/common/Button.jsx
const Button = ({ children, variant = "primary", ...props }) => {
    const variants = {
      primary: "bg-primary-500 hover:bg-primary-400 text-white",
      secondary: "bg-white/10 hover:bg-white/20 text-white",
      danger: "bg-red-500 hover:bg-red-400 text-white",
    };
  
    return (
      <button
        className={`
          ${variants[variant]}
          px-6 py-2 rounded-lg font-medium transition-all duration-200
          focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2
          disabled:opacity-50 disabled:cursor-not-allowed
        `}
        {...props}
      >
        {children}
      </button>
    );
  };
  
  export default Button;