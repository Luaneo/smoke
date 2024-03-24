"use client";

import { useEffect, useState } from "react";

export default function Component() {
  const [fetchedData, setData] = useState(null);

  useEffect(() => {
    fetch("url")
      .then((res) => res.json)
      .then((json) => setData(json.какойтоключ));
  });
}
