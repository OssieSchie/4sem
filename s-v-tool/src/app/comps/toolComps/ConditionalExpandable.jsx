"use client";
import { useState } from "react";
import styles from "./ConditionalExpandable.module.css";

export default function ConditionalExpandable({ condition, children }) {
  return (
    <div
      className={` w-full mt-[20px] ${!condition ? styles.heightCollapse : ""}`}
    >
      <div className={` ${!condition ? styles.animateHeight : "mt-[20px]"}`}>
        <div className="w-full border-t border-[2px] border-svText h-[1px] bg-text"></div>
        {children}
      </div>
    </div>
  );
}
