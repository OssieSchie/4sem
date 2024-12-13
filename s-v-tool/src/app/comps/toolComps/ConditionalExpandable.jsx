"use client";
import { useState } from "react";
import styles from "./ConditionalExpandable.module.css";

export default function ConditionalExpandable({ condition, children }) {
  return (
    <div
      className={` w-full mt-[20px] ${!condition ? styles.heightCollapse : ""}`}
    >
      <div className={` ${!condition ? styles.animateHeight : "mt-[20px]"}`}>
        <div className="w-full border-t border-[1px] border-svText50 h-[1px]"></div>
        {children}
      </div>
    </div>
  );
}
