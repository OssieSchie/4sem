"use client";
import { useState } from "react";
import styles from "./ConditionalExpandable.module.css";

export default function ConditionalExpandable({ condition, children }) {
  return (
    <div
      className={` w-full mb-[40px] ${!condition ? styles.heightCollapse : ""}`}
    >
      <div className={` ${!condition ? styles.heightCollapse : ""}`}>
        {children}
      </div>
    </div>
  );
}
