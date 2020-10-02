import React, { useEffect, useState } from "react";
import "./ExplorePage-Style.css";
import Banner from "../../components/banner-components/Banner";
import Header from "../../components/navbar-components/Navbar";
import { useForm } from "react-hook-form";
import OfferCard from "../../components/offer-components/OfferCard";
import { getAllUsers, getAllOffers } from "../../utils/apiRequests";
import updateAction from "../../updateAction";
import { useStateMachine } from "little-state-machine";
import Footer from "../../components/footer-components/Footer";

const ExplorePage = () => {
  const [parameter, setParameter] = useState("");
  const [responses, setResponses] = useState([]);
  const [query, setQuery] = useState("");
  const { register } = useForm({});
  const { state } = useStateMachine(updateAction);

  // const onSubmit = (data) => {
  //   setParameter(data.type);
  // };

  let filteredResponse = responses.filter((person) => {
    return person;
  });

  if (parameter === "lastname") {
    filteredResponse = responses.filter((person) => {
      return person.lastname?.toLowerCase().includes(query.toLowerCase());
    });
  }

  if (parameter === "name") {
    filteredResponse = responses.filter((person) => {
      return person.name?.toLowerCase().includes(query.toLowerCase());
    });
  }

  if (parameter === "category") {
    filteredResponse = responses.filter((person) => {
      return person.category?.name.toLowerCase().includes(query.toLowerCase());
    });
  }

  if (parameter === "title") {
    filteredResponse = responses.filter((person) => {
      return person.title?.toLowerCase().includes(query.toLowerCase());
    });
  }

  if (parameter === "orgname") {
    filteredResponse = responses.filter((person) => {
      return person.organization?.name
        ?.toLowerCase()
        .includes(query.toLowerCase());
    });
  }

  if (parameter === "offertype") {
    filteredResponse = responses.filter((person) => {
      return person.offerType?.toLowerCase().includes(query.toLowerCase());
    });
  }

  useEffect(() => {
    if (
      state.userInformation.userType !== "undefined" &&
      state.userInformation.userType === "offerer"
    ) {
      getAllUsers().then((res) => {
        console.log(res);
        console.log("ofertante detected");
        setResponses(res.data.data.data);
      });
    } else if (
      state.userInformation.userType !== "undefined" &&
      state.userInformation.userType === "applicant"
    ) {
      getAllOffers().then((res) => {
        console.log("aplicante detected");
        console.log(res.data.data.data);
        setResponses(res.data.data.data);
      });
    } else {
      getAllOffers().then((res) => {
        console.log("no type detected");
        console.log(res.data.data.data);
        setResponses(res.data.data.data);
      });
    }
  }, [state.userInformation.userType]);

  return (
    <div>
      <div className="explorepage">
        <Header />
        <Banner image={"ooyAGWN.png"} />
        <div className="explorepage__inner">
          <form className="explorepage__wrapper">
            <div className="explorepage__searchbox">
              <input
                name="query"
                type="text"
                className="explorepage__inputsearch"
                placeholder="Busca nombres, empresas, organizaciones o etiquetas"
                onChange={(e) => setQuery(e.target.value)}
                ref={register()}
              ></input>

              {typeof state.userInformation.userType !== "undefined" &&
              state.userInformation.userType === "offerer" ? (
                <select
                  type="text"
                  name="type"
                  className="explorepage__select explorepage__searchbtn"
                  ref={register()}
                  onChange={(e) => setParameter(e.target.value)}
                >
                  <option value="name">Buscar por</option>
                  <option value="name">Nombre</option>
                  <option value="lastname">Apellido</option>
                  <option value="category">Categoría</option>
                  <option value="tag">Etiqueta</option>
                </select>
              ) : (
                <select
                  type="text"
                  name="type"
                  className="explorepage__select explorepage__searchbtn"
                  ref={register()}
                  onChange={(e) => setParameter(e.target.value)}
                >
                  <option value="title">Buscar por</option>
                  <option value="title">Nombre</option>
                  <option value="category">Categoría</option>
                  <option value="orgname">Organización</option>
                  <option value="offertype">Tipo de oferta</option>
                </select>
              )}
              {/* <div
                onClick={handleSubmit(onSubmit)}
                className="explorepage__searchbtn"
              >
                <i className="fa fa-search"></i>{" "}
              </div> */}
            </div>
          </form>
          <div className="explorepage__cardscontainer">
            {filteredResponse.map((response) =>
              response ? (
                <OfferCard
                  key={response._id}
                  responseInfo={response}
                ></OfferCard>
              ) : null
            )}
          </div>
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default ExplorePage;
