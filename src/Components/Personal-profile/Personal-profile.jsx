import { useEffect, useRef, useState } from "react";
import { getUser, putUser } from "../../Services/axios";
import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBCardText,
  MDBCardBody,
  MDBCardImage,
  MDBTypography,
  MDBIcon,
} from "mdb-react-ui-kit";
import "./personal-profile.css";
import "mdb-react-ui-kit/dist/css/mdb.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import styles from "../../styles/modules/modal.module.css";
import Button from "../Button";
import "./personal-profile.css";
import toast from "react-hot-toast";
import { borderColor } from "@mui/system";

export const Personal_profile = () => {
  const [user, setUser] = useState({
    fullName: "Guest",
    img: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOAAAADgCAMAAAAt85rTAAAAbFBMVEVGRkb///9DQ0M8PDw5OTk/Pz9AQEA2NjY0NDTu7u78/PzS0tL09PTJycmdnZ1JSUnh4eG1tbVOTk5kZGTp6enDw8OsrKwuLi6MjIx7e3uWlpbOzs66urqmpqZVVVVsbGxdXV1ra2uDg4N9fX0BXUZmAAAHVUlEQVR4nO2diXqqMBBGyUJYREFxQxGtff93vCy1VVuUTCZ10st5AD9+k8waBs8bGRkZGRkZGRkZGRkZGRkZGRkZGRkZGfnf4MqXMmyRUij+6udBhSuRVsV2XWYt5Xp2rFIh/opIX6RFmcXshjia7qq/oJGL4DxlPWSzRahe/YRGcLmYRX3yWqZF4LBEnh6Sh/KavTo5Ckcl8mC7fCavW8XcybMoqmyQvIa557/6cXWpl2+wvJrlm3j1E+vB+VxHX82Mu7RNOZ9o6mNs77lja9RimHW5JatcOYiqguhjLDq6cRDVabj5vCUp5KsffgDcg+prFDpgaUJ9+/JFvCBvaYKVgb7aIS6Ir6E4G+mrbSltU6ryp9H1M8rg1SIeIfem+hjbEj6GYmeurzY0ZI8hV4+z24HsyQoUuhF2D1uiEQ1f4OhjUUVzDUMzF3gFTUvKT8Yu4pMTxSWUazR9bEUy6kYxoR+80XOGvlYR5hkElzBECGKuIHcKMU1Mw5raEqJEaVcsXy3oHt7bYgFyJpY3bZD1sRUtZ8/fsAXGtKyMRIqzr9iS2qMK10k0zEkJTOG1wj4iSo6CV/HzJ9YlJ3QK8W0Mo3UIcQPRD1aEEntxsCAwIyTQgpdgLCFUuQiwA7UWSgJNOi69HOlkvXYEzugcQmlFIKGcUOEHMjVzOgLtbNEJnYxpFOi6QFn+dYGIVW2SAq3EopQEWskmKAnkJxsCp4QEVrh17Q5Cjt5GTYaxA51Y1BM28iVKNQsxsyDwz1edCCW8dbCGry9KXy3qGguHcEonoffw+4OMVL7rNbeA0D3hO6kVRLloeEtKycZYcBQTUju0CUcx78kwUjW1Dryrai0xJTffwnNUgYRypQspamGG3A6ts94CUV9E7qpTjUTMmeb0FrBeQtOXJq4gZ2Ja8LpoU0Kp4BXqiCUwpxWmfYJ1774kFsV8wj3Yu5F3xKRS3RtwXMWB6gJ6OEX8jOz6NWzM45mCpgn9wDyrIBik3SAKs3tre7pvn32gjAxNRteCfmJSgEpy0gfwAwlWGBfED+AHEtgvjGkb0CtglsYdfU3crR+0uTLMosP3dD3+xJlxJB081DM1ZUo0RerHz4cv4rKQ9P3fNxTfDYzb5gu3tucngh8GmNPJ0cnBYx3SOzyxp3tnR8d1cOWdp307Nc7mJ99peS2+PJ3L5FsDMcnWx9QJ28KFELKh11FzP0jz3WGVdds1Xmbl7L0KH+xNodofJDCiU8kwn03bB5/s+INYhPtChuGmJQwfj4kVfNa6mOV0lj/6G6zDBS/m0ZehjLYBwj9exwhfhzaOZsf0RevI67W7n/1ams/w495dqzHOdosXLKMv89UPNw8mpj7bX/zQxElWufjdWECobU8zKcuNypryrcenTM7hr2UbXPIHs22TLdz282DbH/osZ/xXvAoPTuvHMeYcmhmo9PH19uRgf5wsF4vV0xB6X4EUyvxpDzVaLXyrEoUa1EGKtxvtx+DhoLs2yYHbMzf1ERlauJ4uNE2CPA1NHyNrySPn5fBiUrRLNf5pXz0ZyX3D3LOj8CcP9YBJMdQ9K1Fo/rSNOZaq0u6r7HM54EFUeNTuSUX4CgH6alZvmycbVYQF5PJCdkJWyDX354V4cvb6B9qrgO/uw9mhCpHbUBJ+R2RZHn/6vkSdRnpFCW8nTkNMfb7ZfdDldFdJ4Utf8Zrm8yEqqHa9pYxh7BA3KcrbSfv5/Pye17zv1iXG1T3ET6vYGQVgCt74NbOurT3QrrTZeUnXnCnSEqqjhYE4GGBdfLYybQQFpLdHONEFrCM2FH12XtHFAeUlQ5+oiWnAGIzEq1ereASClaG8QxkrzOM1gzD7FyiN9ygH5YG/xtL4RVG8q+Z2MH6FxM6gCjyMHYWVd+QRMT+EpI8gY5nhISQbaF9IDA+hhferkTGcd2xnnBEmhlNLNsSPYH0IDVMmG6NiUEmM5FGtxlyRGE15tDJIBRkjV++TrVZ8YTQ6yMIEbXSMpltJ4m6+ITJYQZ6++umHYDDXg3qu1GFQHXXBiDK2g+9R+oFag0H51870XmxW8C1qZeQdOvCh6naGFqIDn1BmZ+wkPuD7CA6E2i3gcJt6Re0CONym2xi8BewnqLau7wF/pUk44SUYmwC3KPG2xBfQBgX2N+msAf26iCtegsVvMIGYY6jsAmyDuuIG64QJZmVccYNgRxg4UHHqAF7LCx3xEnXCBLscKx3xErUjBGWEjmSDDTBHqI7uCAR1Qd1xg0BH6EbNsAOUEbrj54HDylzoLF0AeXrhSLrbAPL0gTN+HujpXWidXUg2AIHeq59agwSwRV2p+rZAQhln8vkWgKenfZX5HsCFLpcCGZCnl7jfH7AMwNO7k883lPpbVDkUyIC6vK7U7Tsy7RV0pm7foV+0cKhg0aAfytB+Zek7uvqcE6gdq7kVqQHuc7kmUDsYdStSAwSjLpWcGrQbTO60ljq0Lzbb+f6zPbSjbVeukFzQrqu5JlD7avookBj/r8B/6+OOffURIeIAAAAASUVORK5CYII=",
    phoneNumber: "09031234567",
    email: "example@gmail.com",
  });
  const [userName, setUserName] = useState("Guest");
  const [userImg, setUserImg] = useState("data:image/png;base64,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")
  const [imgFile, setImgFile] = useState("");
  const handleSumbit = (e) => {
    e.preventDefault();
    if (user.fullName === "") {
      toast.error("Please enter a Name.");
      return;
    } else if (user.email === "") {
      toast.error("Please enter a Email.");
    }
    if (user.fullName && user.email) {
        let fileReader = new FileReader();
        fileReader.readAsDataURL(imgFile);
        fileReader.onload = (event) => {
          console.log("H")
          putUser({
            fullName: user.fullName,
            email: user.email,
            phoneNumber: user.phoneNumber,
            picture: event.target.result,
          }).then(() => {
          });
        };

        toast.success("Personal Information Updated Successfully");
    }
  };

  useEffect(() => {
    getUser().then((e) => {
      setUserName(e.data.fullName);
      setUserImg(e.data.picture);
      setUser({
        fullName: e.data.fullName,
        email: e.data.email,
        phoneNumber: e.data.phoneNumber,
      })
    });
  }, []);

  return (
    <section className="vh-100" style={{ backgroundColor: "#161616" }}>
      <MDBContainer className="py-5 h-100">
        <MDBRow className="justify-content-center align-items-center h-100">
          <MDBCol lg="6" className="mb-4 mb-lg-0">
            <MDBCard className="mb-3" style={{ borderRadius: ".5rem" }}>
              <MDBRow className="g-0">
                <MDBCol
                  md="4"
                  className="gradient-custom text-center text-white"
                  style={{
                    borderTopLeftRadius: ".5rem",
                    borderBottomLeftRadius: ".5rem",
                  }}
                >
                  <MDBCardImage
                    src={userImg}
                    alt="Avatar"
                    className="my-5"
                    style={{ width: "100px" }}
                    fluid
                  />
                  <div className="admin-name">
                    <h4>{userName}</h4>
                    <p>Manager</p>
                  </div>
                </MDBCol>
                <MDBCol md="8">
                  <div className="p-4" style={{ backgroundColor: "#262626" }}>
                    <form
                      className={styles.form}
                      onSubmit={(e) => handleSumbit(e)}
                    >
                      <h1 className={styles.formTitle}>Personal Information</h1>
                      <label htmlFor="title">
                        Name
                        <input
                          className="personal-form-input"
                          style={{backgroundColor: "#161616"}}
                          value={user.fullName}
                          type="text"
                          id="title"
                          onChange={(e) =>
                            setUser({ fullName: e.target.value })
                          }
                        />
                      </label>

                      <label htmlFor="title">
                        Email
                        <input value={user.email} type="email" id="title"
                        style={{backgroundColor: "#161616"}} 
                        onChange={(e) =>
                            setUser({ email: e.target.value })
                          } />
                      </label>
                      <label className="uploadImg" for="imageUpload">
                        Upload Personal picture
                        <input
                          type="file"
                          id="imageUpload"
                          accept=".png, .jpg, .jpeg"
                          onChange={(e) => { setImgFile(e.target.files[0])} }
                        />
                      </label>
                      <label for="phoneNumber">Phone Number</label>
                      <input
                        className="Label"
                        type="number"
                        id="phone"
                        name="phone"
                        value={user.phoneNumber}
                        style={{backgroundColor: "#161616"}}
                        onChange={(e) =>
                          setUser({ phoneNumber: e.target.value })
                        }
                      />
                      <div className={styles.buttonContainer}>
                        <Button type="submit" className={styles.submit} style={{color:"black"}}>
                          Submit
                        </Button>
                      </div>
                    </form>
                  </div>
                </MDBCol>
              </MDBRow>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </section>
  );
};
