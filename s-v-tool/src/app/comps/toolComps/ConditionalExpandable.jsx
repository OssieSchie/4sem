"use client";
import { useState } from "react";
import styles from "./ConditionalExpandable.module.css";

export default function ConditionalExpandable({ condition, children }) {
  return (
    <div
      className={` w-full overflow-clip mt-[40px] ${
        !condition ? styles.heightCollapse : styles.heightExpanded
      }`}
    >
      <div
        className={` overflow-clip ${
          !condition ? styles.heightCollapse : styles.heightExpanded
        }`}
      >
        {children}
      </div>
    </div>
  );
}