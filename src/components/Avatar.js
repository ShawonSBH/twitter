import Dp from "../../public/users.png";
export function Avator({ size = "48", src = Dp }) {
  return (
    <img
      alt="avatar"
      style={{
        borderRadius: "50%",
        objectFit: "cover",
        width: "3rem",
        height: "3rem",
      }}
      src={src}
    />
  );
}
