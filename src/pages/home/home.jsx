import './home.scss';
import { Button, Icon } from "semantic-ui-react";
import Navbar from '../../components/navbar/navbar'

function Home() {
  return (
    <div className="home-container">
      <Navbar />
      <div className="product">
        <div className="card-container" onClick={() => { }}>
          <img className="image" src="https://phucanhcdn.com/media/product/35600_laptop_asus_a412fa_ek378t__blue__1_1.png" />
          <h4 className="name">Asus A series A412FA-EK378T</h4>
          <p className="email d-flex">Hãng: <span className="ml-1 text-success font-weight-bold">ASUS</span></p>
          <p className="email d-flex">Chip xử lý: <span className="ml-1 text-success font-weight-bold">Core i7 10th</span></p>
          {/* <button onClick={() => { }} className="btn-success">
            Mua ngay
          </button> */}
          <Button onClick={() => {}} color="green">
            <Icon name="eye" /> Xem sản phẩm
          </Button>
        </div>
        <div className="card-container" onClick={() => { }}>
          <img className="image" src="https://phucanhcdn.com/media/product/35600_laptop_asus_a412fa_ek378t__blue__1_1.png" />
          <h4 className="name">Asus A series A412FA-EK378T</h4>
          <p className="email d-flex">Hãng: <span className="ml-1 text-success font-weight-bold">ASUS</span></p>
          <p className="email d-flex">Chip xử lý: <span className="ml-1 text-success font-weight-bold">Core i7 10th</span></p>
          {/* <button onClick={() => { }} className="btn-success">
            Mua ngay
          </button> */}
          <Button onClick={() => {}} color="green">
            <Icon name="eye" /> Xem sản phẩm
          </Button>
        </div>
        <div className="card-container" onClick={() => { }}>
          <img className="image" src="https://phucanhcdn.com/media/product/35600_laptop_asus_a412fa_ek378t__blue__1_1.png" />
          <h4 className="name">Asus A series A412FA-EK378T</h4>
          <p className="email d-flex">Hãng: <span className="ml-1 text-success font-weight-bold">ASUS</span></p>
          <p className="email d-flex">Chip xử lý: <span className="ml-1 text-success font-weight-bold">Core i7 10th</span></p>
          {/* <button onClick={() => { }} className="btn-success">
            Mua ngay
          </button> */}
          <Button onClick={() => {}} color="green">
            <Icon name="eye" /> Xem sản phẩm
          </Button>
        </div>
        <div className="card-container" onClick={() => { }}>
          <img className="image" src="https://phucanhcdn.com/media/product/35600_laptop_asus_a412fa_ek378t__blue__1_1.png" />
          <h4 className="name">Asus A series A412FA-EK378T</h4>
          <p className="email d-flex">Hãng: <span className="ml-1 text-success font-weight-bold">ASUS</span></p>
          <p className="email d-flex">Chip xử lý: <span className="ml-1 text-success font-weight-bold">Core i7 10th</span></p>
          {/* <button onClick={() => { }} className="btn-success">
            Mua ngay
          </button> */}
          <Button onClick={() => {}} color="green">
            <Icon name="eye" /> Xem sản phẩm
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Home;
