import { v4 } from "uuid";
import AutoInput from "../components/AutoInput";
import Select from "../components/Select";
import SubmitButton from "../components/SubmitButton";
import { statusOpt, typeOpt } from "../constants";
import api from "../utils/api";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { createJobs } from "../app/slices/jobSlice";
import { useNavigate } from "react-router-dom";

const AddJob = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // formData oluştur
    const formData = new FormData(e.target);

    const newJobData = Object.fromEntries(formData.entries());
    newJobData.id = v4();
    newJobData.date = Date.now();

    api
      .post("/jobs", newJobData)
      .then(() => {
        toast.success("İş başarıyla eklendi", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
        // store 'a yeni veriyi kaydet
        dispatch(createJobs(newJobData));
        //İşlem başarılı olursa anasayfaya yönlendir.
        navigate("/");
      })
      .catch((err) => {
        // Hata durumunda toast ile mesaj göster
        toast.error(`İş eklenirken bir sorun oluştu: ${err.message}`, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      });
  };

  return (
    <div className="add-page">
      <section className="container">
        <h2>Yeni iş Ekle</h2>
        <form onSubmit={handleSubmit}>
          <AutoInput label={"Pozisyon"} name="position" />
          <AutoInput label={"Şirket"} name="company" />
          <AutoInput label={"Lokasyon"} name="location" />

          <Select label={"Durum"} options={statusOpt} name="status" />
          <Select label={"Tür"} options={typeOpt} name="type" />

          <div>
            <SubmitButton text={"Oluştur"} />
          </div>
        </form>
      </section>
    </div>
  );
};

export default AddJob;
