interface IconWrapperProps {
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  size?: number;
  color?: string;
}

const Iconwrapper = ({
  icon: Icon,
  size = 24,
  color = "black",
}: IconWrapperProps) => {
  return (
    <div style={{ width: size, height: size, color }}>
      <Icon />
    </div>
  );
};

export default Iconwrapper;