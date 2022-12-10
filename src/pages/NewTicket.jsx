import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import { createTicket, reset } from '../features/tickets/ticketSlice'
import Spinner from '../components/Spinner'
import BackButton from '../components/BackButton'

function NewTicket() {
  const { user } = useSelector((state) => state.auth);
  const { isLoading, isError, isSuccess, message } = useSelector((state) => state.tickets)

  const [name] = useState(user.name);
  const [email] = useState(user.email);
  const [product, setProduct] = useState("Xiaomi 12");
  const [description, setDescription] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() =>{
    if(isError){
      toast.error(message)
    }

    if(isSuccess){
      dispatch(reset())
      navigate('/tickets')
    }

    dispatch(reset())
  },[dispatch, isError, isSuccess, navigate, message])

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createTicket({product,description}))
  };

  if(isLoading) {return <Spinner/>}

  return (
    <>
    <BackButton url='/'/>
      <section className="heading">
        <h1>Create new Ticket</h1>
        <p>Please fill out the form below</p>
      </section>

      <section className="form">
        <div className="form-group">
          <label htmlFor="name">Customer Name</label>
          <input type="text" className="form-control" value={name} disabled />
        </div>

        <div className="form-group">
          <label htmlFor="email">Customer Email</label>
          <input type="text" className="form-control" value={email} disabled />
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="product">Product</label>
            <select
              name="product"
              id="product"
              value={product}
              onChange={(e) => setProduct(e.target.value)}
            >
              <option value="Xiaomi 12">Xiaomi 12</option>
              <option value="Xiaomi 11">Xiaomi 11</option>
              <option value="Mi 11">Mi 11</option>
              <option value="Mi 10">Mi 10</option>
              <option value="Mi 9">Mi 9</option>
              <option value="Xiaomi Smart Band 7">Xiaomi Smart Band 7</option>
              <option value="Redmi Pad">Redmi Pad</option>
              <option value="RedmiBook 15">RedmiBook 15</option>
              <option value="Mi True Wireless Earphones 2">
              Mi True Wireless Earphones 2
              </option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="description">Description of the issue</label>
            <textarea
              name="description"
              id="description"
              className="form-control"
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </div>

          <div className="form-group">
            <button type="submit" className="btn btn-block">
              Submit
            </button>
          </div>
        </form>
      </section>
    </>
  );
}

export default NewTicket;
