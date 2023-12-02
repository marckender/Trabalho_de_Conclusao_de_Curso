import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import React from 'react';

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
  startIcon?: React.ReactElement;
  endIcon?: React.ReactElement;
  width?: number | string;
  height?: number | string;
  size?: 'small' | 'medium' | 'large';
  backgroundColor?: string;
  textColor?: string;
  color?: any; // Mantenha o tipo do color prop
  type?: 'button' | 'submit' | 'reset'; // Adicione type prop
  disabledBackgroundColor?: string;
  variant?: any
}

const CustomButton: React.FC<Props> = ({
  children,
  isLoading = false,
  startIcon,
  endIcon,
  onClick,
  width = "50px",
  height = "30px",
  size = 'medium',
  disabled,
  variant = 'contained',
  type = 'button', // Defina o valor padrão para type prop
  color,
  className,
  backgroundColor,
  textColor,
  disabledBackgroundColor = '#CCCCCC', // Defina o valor padrão para disabledBackgroundColor prop
  ...rest
}) => {
  const buttonStyle = {
    width,
    height,
    color: textColor,
    backgroundColor: isLoading || disabled ? disabledBackgroundColor : backgroundColor,
  };

  return (
    <Button
      variant={variant}
      color={color}
      disabled={disabled || isLoading}
      onClick={onClick}
      style={buttonStyle}
      size={size}
      type={type}
      // Passe type prop para o componente Button
      {...rest}
      startIcon={isLoading ? <CircularProgress size={20} color="inherit" /> : startIcon}
      endIcon={endIcon}
      className={className}
    >
      {children}
    </Button>
  );
};

export default CustomButton;