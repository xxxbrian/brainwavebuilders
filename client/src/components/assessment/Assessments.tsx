import React, { useState, useEffect } from "react";
import { Card, Typography, Text } from "@radix-ui/themes";

export type Assessment = {
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  completed: int;
  type: string;
  id: string;
  submissions: string;
};

export type Assignment = {
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  completed: int;
  id: string;
  submissions: string;
};
