import { useEffect, useState } from "react";
import { sortOpt, statusOpt, typeOpt } from "../constants";
import Select from "./Select";
import SubmitButton from "./SubmitButton";
import { useDispatch } from "react-redux";
import { setError, setJobs, setLoading } from "../app/slices/jobSlice";
import api from "../utils/api";
const Filter = () => {
  const dispatch = useDispatch();

  const [text, settext] = useState();
  const [status, setStatus] = useState();
  const [type, setType] = useState();
  const [sort, setSort] = useState();
  const [debouncedText, setDebouncedText] = useState();

  //* DEBOUNCE
  /*
   *Bir olayın çok sık tetiklenmesinde önlemek için kullanılır.
   * Her tuşa basıldığında arama yapmak yerine, kullanıcın yazmayı bitirmesini bekleyip yenlızca belirli bir süre geçtikten sonra arama yapar. Bu performansı arttırır ve gereksiz ağ isteklerini işlem yükünü azaltır.
   */

  useEffect(() => {
    if (text === undefined) return;
    //Bir sayaç başlat işlemi sayaç durunca yap
    const timer = setTimeout(() => setDebouncedText(text), 500);
    //Eğerki süre bitmeden Tekrar useeffect çalışırsa(yeni sayaç başlaması) önceki sayacı iptal et
    return () => {
      clearTimeout(timer);
    };
  }, [text]);

  //* Filtreleme veya sıralama ile ilgili bir state değiştiğinde api den güncel verileri al
  useEffect(() => {
    const sortParam =
      sort === "a-z" || sort === "z-a"
        ? "company"
        : sort == "En Yeni" || sort === "En Eski"
        ? "date"
        : undefined;

    const orderParam =
      sort === "a-z"
        ? "asc"
        : sort === "z-a"
        ? "desc"
        : sort === "En Yeni"
        ? "desc"
        : sort === "En Eski"
        ? "asc"
        : undefined;

    const params = {
      q: text,
      _sort: sortParam,
      _order: orderParam,
      type: type || undefined,
      status: status || undefined,
    };
    dispatch(setLoading());

    api
      .get("/jobs", { params })
      .then((res) => dispatch(setJobs(res.data)))
      .catch((err) => dispatch(setError(err.message)));
  }, [debouncedText, sort, type, status]);

  // Filtreyi sıfırla butonuna tıkladığımıda stateleri ve inputları sıfırlar
  const handleReset = (e) => {
    e.preventDefault();
    //stateleri sıfırla
    settext();
    setSort();
    setStatus();
    setType();
    setDebouncedText();
    //İnputları sıfırla
    e.target.reset();
  };
  return (
    <div className="filter-sec">
      <h2>Filtrleme Formu</h2>

      <form onSubmit={handleReset}>
        <div>
          <label>Ara</label>
          <input type="text" onChange={(e) => settext(e.target.value)} />
        </div>
        <Select
          label="Durum"
          options={statusOpt}
          handleChange={(e) => setStatus(e.target.value)}
        />
        <Select
          label={"Tür"}
          options={typeOpt}
          handleChange={(e) => setType(e.target.value)}
        />
        <Select
          label={"Sırala"}
          options={sortOpt}
          handleChange={(e) => setSort(e.target.value)}
        />

        <div>
          <SubmitButton text={"Filtreleri Sıfırla"} />
        </div>
      </form>
    </div>
  );
};

export default Filter;
