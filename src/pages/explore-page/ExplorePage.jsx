import React, { useEffect, useState } from "react";
import "./ExplorePage-Style.css";
import Banner from "../../components/banner-components/Banner";
import Header from "../../components/navbar-components/Navbar";
import Footer from "../../components/footer-components/Footer";
import { useForm } from "react-hook-form";
import OfferCard from "../../components/offer-components/OfferCard";
import { getAllUsers, getAllFilteredOffers } from "../../utils/apiRequests";
import updateAction from "../../updateAction";
import { useStateMachine } from "little-state-machine";

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

  if (parameter === "tag") {
    filteredResponse = responses.filter((person) => {
      let flag = false;
      person.tags.forEach((tag) => {
        if (tag.name?.toLowerCase().includes(query.toLowerCase())) {
          flag = true;
        }
      });
      return flag;
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
      setParameter("name");
      getAllUsers().then((res) => {
        setResponses(res.data.data.data);
      });
    } else if (
      state.userInformation.userType !== "undefined" &&
      state.userInformation.userType === "applicant"
    ) {
      setParameter("title");
      getAllFilteredOffers().then((res) => {
        setResponses(res.data.data.data);
      });
    } else {
      setParameter("title");
      getAllFilteredOffers().then((res) => {
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
                    <option value="title">Nombre</option>
                    <option value="category">Categoría</option>
                    <option value="tag">Etiqueta</option>
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
          {filteredResponse && filteredResponse.length === 0 ? (
            <div className="summary__announcement">
              <div className="summarypage__imgbg">
                <img src="https://i.imgur.com/agtLnO2.png" alt="applied" className="summarypage_shortimg"></img>
              </div>
              <div className="summary__announcementinner">
                <span className="summarypagea__title--dark">Parece que no hemos podido recuperar ninguna oferta o persona</span>
                <span>Puedes volver a revisar en breve y probablemente seamos capaces de conseguir algo para tí</span>
              </div>
            </div>
          ) : (
              ""
            )}
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default ExplorePage;
