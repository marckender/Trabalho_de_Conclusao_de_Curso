import "./styles.scss";
interface ButtonProps {
  label: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onClick?: (e:any) => void;
  size?: "small" | "medium" | "large";
  color?: string;
  background?: string
  width?: number | string;
  disabled?: boolean;
  loading?:boolean
}

const BaseButton = ({ loading,disabled, label, onClick, size = "medium", color="ffffff", background = "#0000", width }: ButtonProps) => {
  const buttonSize = size === "small" ? "btn-small" : size === "large" ? "btn-large" : "";

  const buttonStyle = {
    color: color,
    backgroundColor: background,
    width: width ? `${width}%` : undefined,
  };

  return (
    <button disabled={disabled || loading} className={`base_button ${buttonSize}`} style={buttonStyle} onClick={onClick}>
      {loading ? 'loading ...': label}
    </button>
  );
};

export default BaseButton;