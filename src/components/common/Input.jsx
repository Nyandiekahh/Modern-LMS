// src/components/common/Input.jsx
const Input = ({ label, type = "text", error, ...props }) => {
    return (
      <div className="space-y-1">
        {label && (
          <label className="block text-sm font-medium text-gray-200">
            {label}
          </label>
        )}
        <input
          type={type}
          className={`
            w-full px-4 py-2 bg-white/10 border rounded-lg focus:ring-2 focus:ring-primary-500
            ${error ? 'border-red-500' : 'border-white/20'}
            text-white placeholder-gray-400
          `}
          {...props}
        />
        {error && <p className="text-sm text-red-500">{error}</p>}
      </div>
    );
  };
  
  export default Input;