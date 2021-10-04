import react from "react";
import "./footer.scss";
import { Button } from "semantic-ui-react";

const Footer = () => {
  return (
    <div className="footer">
      <div className="information">
        <h4>Thông tin chung </h4>
        <ul>
          <li> Giới thiệu về công ty </li>
          <li> Tin tuyển dụng </li>
          <li> Liên hệ góp ý </li>
          <li> Tin Tức </li>
        </ul>
      </div>
      <div className="branch_1">
        <h4> Chi nhánh : </h4>
        <ul>
          <li> Điện Phương - Điện Bàn - Quảng Nam </li>
          <li> 128 Điện Biên Phủ - TP Đà Nẵng </li>
          <li> 680 Điện Biên Phủ - TP Đà Nẵng </li>
        </ul>
      </div>
      <div className="image_ft">
        <h4> Liên Lạc </h4>
        <div className="image_icon">
          <a href=" https://www.youtube.com/ ">
            <Button circular color="facebook" icon="facebook" />{" "}
          </a>
          <a href="https://www.youtube.com/  ">
            <Button circular color="twitter" icon="twitter" />{" "}
          </a>
          <a href=" https://www.youtube.com/ ">
            <Button circular color="linkedin" icon="linkedin" />{" "}
          </a>
          <a href=" https://www.youtube.com/ ">
            <Button circular color="google plus" icon="google plus" />{" "}
          </a>
        </div>
      </div>
      <i> design by Ngô Hiếu </i>
    </div>
  );
};
export default Footer;
