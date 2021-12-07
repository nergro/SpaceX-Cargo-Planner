import s from "./Spinner.module.css";

export const Spinner = () => {
  return (
    <div className={s.spinner}>
      <div className={s.spinnerBlock}>
        <span className={s.circle}></span>
        <span className={s.circle}></span>
        <span className={s.circle}></span>
        <span className={s.circle}></span>
        <span className={s.circle}></span>
        <span className={s.circle}></span>
        <span className={s.circle}></span>
      </div>
    </div>
  );
};
