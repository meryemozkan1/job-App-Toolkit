import React from "react";
import { useSelector } from "react-redux";

const AutoInput = ({ label, name }) => {
  const jobs = useSelector((store) => store.jobs);

  // 1) Sadece 'name' değeri ile eşleşen pozisyonlardan oluşan bir dizi oluştur
  const arr = jobs.map((job) => job[name]);

  // 2) Dizideki tekrar eden elemanları kaldır
  const filtredSet = new Set(arr);

  // 3) Set'in döndürdüğü nesneyi diziye çevir
  const options = Array.from(filtredSet);

  return (
    <div>
      <label htmlFor={label}>{label}</label>
      <input type="text" id={label} name={name} list={name} required />

      <datalist id={name}>
        {options.map((i, index) => (
          <option key={index} value={i} />
        ))}
      </datalist>
    </div>
  );
};

export default AutoInput;
