import React from "react";
import "../../css/addDog.css";
import "../../css/reg.css";
import BasePath from "../../api/BasePath";
import { Redirect } from "react-router-dom";
import Popup from "../PopUp";
import EditDog2 from "./EditDog2";
import EditDog1 from "./EditDog1";

import { ReactComponent as Hint } from "../hint.svg";
const hint = () => (
  <div>
    {
      <svg width="25" height="25">
        <circle
          cx="11"
          cy="11"
          r="10"
          stroke="gray"
          stroke-width="1"
          fill="gray"
        />
        <text
          x="6"
          y="19"
          font-size="22px "
          fill="white"
          font-weight="bold"
          font-family="'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
        >
          ?
        </text>
        Sorry, your browser does not support inline SVG.
      </svg>
    }
    <Hint />
  </div>
);

class EditDogMain extends React.Component {
  state = {
    images: [],
    fieldName: [],
    page: "",
    showPopup: false,
    cn: "",
    dog: {},
    dogsList: [],

    dogname: "",
    dogId: "",
    breed: "",
    dob: "",
    gender: "",
    weight: "",
    neuteredspayed: "",
    medication: "",
    medList:[],
    allList: [],
    allergies: "",
    physlimit: "",
    veterinarianN: "",

    strangers: "",
    largerdogs: "",
    smalldogs: "",
    puppies: "",
    train:"",
    da2pp: "",
    rabies: "",
    bordetella: "",

    initialStates: false
  };


  getDogInfo = async () => {

    console.log(localStorage.getItem('token'));

    const dogInfo = this.props.location.state.dog;
    console.log(dogInfo);

    var vetName = '';

    if (dogInfo.veterinarian !=null ) {
      vetName = dogInfo.veterinarian.vetName;
    };

    if (this.state.initialStates === false) {
      this.setState({
        initialStates: true,
        dogname: dogInfo.name,
        dogId: dogInfo.idNumber,
        breed: dogInfo.breed,
        dob: dogInfo.dateOfBirth,
        gender: dogInfo.gender,
        weight: dogInfo.weight,
        neuteredspayed: dogInfo.spayedNeutered,
        medList: dogInfo.medications,
        allList: dogInfo.allergies,
        medication: dogInfo.medications[0],
        allergies: dogInfo.allergies[0],
        physlimit: dogInfo.physLimit,
        veterinarianN: vetName,
        strangers: dogInfo.strangers,
        largerdogs: dogInfo.largerdogs,
        smalldogs: dogInfo.smalldogs,
        puppies: dogInfo.puppies,
        train: dogInfo.trainingDone,
        da2pp: dogInfo.vaccines.da2pp,
        rabies: dogInfo.vaccines.rabies,
        bordetella: dogInfo.vaccines.bordetella
      });
    }
  };

  onSearchSubmit1 = async () => {
    
    this.state.medList.push(this.state.medication);
    this.state.allList.push(this.state.allergies);

    this.setState({ images: 'Valid' });
  };

  onPrevious = () => {
    console.log("main");
    this.setState({ images: [] });
    console.log(this.state.images);
  };

  onSearchSubmit2 = async () => {
    //called when step 2 submitted
    var dogname = this.state.dogname;
    var breed = this.state.breed;

    var dob = this.state.dob;
    var gender = this.state.gender;
    var weight = this.state.weight;
    var neuteredspayed = this.state.neuteredspayed;
    var physlimit = this.state.physlimit;
    var veterinarianName = this.state.veterinarianN;
    var dogId = this.state.dogId;
    var strangers = this.state.strangers;
    var largerdogs = this.state.largerdogs;
    var smalldogs = this.state.smalldogs;
    var puppies = this.state.puppies;
    var train = this.state.train;
    // if (this.state.strangers == 'true') {
    //   strangers=true;
    // } else {
    //   strangers=false;
    // }
    // if (this.state.largerdogs == 'true') {
    //   largerdogs=true;
    // } else {
    //   largerdogs=false;
    // }
    // if (this.state.smalldogs =='true') {
    //   smalldogs =true;
    // } else {
    //   smalldogs=false;
    // }
    // if (this.state.puppies =='true') {
    //   puppies =true;
    // } else {
    //   puppies=false;
    // }
    var da2pp = this.state.da2pp;
    var rabies = this.state.rabies;
    var bordetella = this.state.bordetella;
    var token = localStorage.getItem("token");

    const response = await BasePath.put('/webresources/updateDog', {
      token:token,
      idNumber: dogId,
      name:dogname,
      breed: breed,
      dateOfBirth: dob,
      gender: gender,
      weight: weight,
      spayedNeutered: neuteredspayed,
      medications: this.state.medList,
      allergies: this.state.allList,
      physLimit: physlimit,
      veterinarian: {
        vetName: veterinarianName
      },

      strangerComfortable: strangers,
      largeDogFriendly: largerdogs,
      smallDogFriendly: smalldogs,
      puppyFriendly: puppies,
      vaccines:
      {
        da2pp: da2pp,
        rabies: rabies,
        bordetella: bordetella
      },
      active: true,
      trainingDone: train
    });

    this.setState({ images: response.data });
  };

  togglePopup() {
    //just for the popup for validation
    this.setState({
      showPopup: !this.state.showPopup
    });
  }

  handleChangeDogname = event => {
    //getting info from the fields, needed
    this.setState({ dogname: event.target.value });
  };

  handleChangeBreed = event => {
    this.setState({ breed: event.target.value });
  };

  handleChangeDob = event => {
    this.setState({ dob: event.target.value });
  };

  handleChangeGender = event => {
    this.setState({ gender: event.target.value });
  };

  handleChangeWeight = event => {
    this.setState({ weight: event.target.value });
  };

  handleChangeNeuteredspayed = event => {
    this.setState({ neuteredspayed: event.target.value });
    console.log(this.state.neuteredspayed);
  };

  handleChangeMedication = event => {
    this.setState({ medication: event.target.value });
    //this.state.medList.push(this.state.medication);
  };

  handleChangeAllergies = event => {
    this.setState({ allergies: event.target.value });
    //this.state.allList.push(this.state.allergies);
  };

  handleChangePhyslimit = event => {
    this.setState({ physlimit: event.target.value });
  };

  handleChangeVeterinarian = event => {
    this.setState({ veterinarianN: event.target.value });
  };

  handleChangeStrangers = event => {
    this.setState({ strangers: event.target.value });
  };

  handleChangeLargerdogs = event => {
    this.setState({ largerdogs: event.target.value });
  };

  handleChangeSmalldogs = event => {
    this.setState({ smalldogs: event.target.value });
  };

  handleChangePuppies = event => {
    this.setState({ puppies: event.target.value });
  };

  handleChangeDa2pp = event => {
    this.setState({ da2pp: event.target.value });
  };

  handleChangeRabies = event => {
    this.setState({ rabies: event.target.value });
  };

  handleChangeBordetella = event => {
    this.setState({ bordetella: event.target.value });
  };

  render() {
    this.getDogInfo(); //just for editing

    var isValid = this.state.images; // images - message sent from the back

    if (isValid === "Updated") {
      //validation after submitting the 2nd step, add and edit
      return (
        <div style={{ marginTop: "10px" }}>
          <Redirect
            to={{
              pathname: "/Profile", //will be path for the UserAcc
              state: { message: "Dog updated" }
            }}
          />
        </div>
      );
    } else if (isValid !== "Valid") {
      //will be the first step
      return (
        <div style={{ marginTop: "10px" }}>
          <EditDog1
            onChangeDogname={this.handleChangeDogname}
            onChangeBreed={this.handleChangeBreed}
            onChangeDob={this.handleChangeDob}
            onChangeGender={this.handleChangeGender}
            onChangeWeight={this.handleChangeWeight}
            onChangeNeuteredspayed={this.handleChangeNeuteredspayed}
            onChangeMedication={this.handleChangeMedication}
            onChangeAllergies={this.handleChangeAllergies}
            onChangePhyslimit={this.handleChangePhyslimit}
            onChangeVeterinarian={this.handleChangeVeterinarian}
            dogname={this.state.dogname}
            breed={this.state.breed}
            dob={this.state.dob}
            gender={this.state.gender}
            weight={this.state.weight}
            neuteredspayed={this.state.neuteredspayed}
            medication={this.state.medication}
            allergies={this.state.allergies}
            physlimit={this.state.physlimit}
            veterinarianN={this.state.veterinarianN}
            onSubmit={this.onSearchSubmit1}
          // onClick={() => {
          //   //no needed
          //   this.props.onChangePage("about"); //no needed
          // }}
          />
          <div>
            {this.state.showPopup ? ( //need it probably for error messages
              <Popup
                cn={this.state.cn}
                text={this.state.images}
                closePopup={this.togglePopup.bind(this)}
                bgColor="red"
              />
            ) : null}
          </div>
        </div>
      );
    } else {
      //is valid - the second step
      return (
        <div style={{ marginTop: "10px" }}>
          <EditDog2
            onChangeStrangers={this.handleChangeStrangers}
            onChangeLargerdogs={this.handleChangeLargerdogs}
            onChangeSmalldogs={this.handleChangeSmalldogs}
            onChangePuppies={this.handleChangePuppies}
            onChangeDa2pp={this.handleChangeDa2pp}
            onChangeRabies={this.handleChangeRabies}
            onChangeBordetella={this.handleChangeBordetella}
            strangers={this.state.strangers}
            largerdogs={this.state.largerdogs}
            smalldogs={this.state.smalldogs}
            puppies={this.state.puppies}
            da2pp={this.state.da2pp}
            rabies={this.state.rabies}
            bordetella={this.state.bordetella}
            onSubmit={this.onSearchSubmit2} //calls onsearch submit, all the stuff is getting passed from main page to the step2
            onClickPrev={this.onPrevious} //don't need
          />
        </div>
      );
    }
  }
}

export default EditDogMain;
