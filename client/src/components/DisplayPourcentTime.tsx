import { useEffect, useState } from "react";
import {
  CircularProgress,
  CircularProgressLabel,
  Image,
  Text,
} from "@chakra-ui/react";

interface DisplayPourcentTimeProps {
  image?: string;
  startDate: Date;
  endDate: Date;
  width?: string;
  title?: string;
}

const DisplayPourcentTime = ({
  image,
  endDate,
  startDate,
  width = "60%",
  title = "",
}: DisplayPourcentTimeProps) => {
  const [pourcent, setPourcent] = useState(0);
  const [color, setColor] = useState("green");

  useEffect(() => {
    const pourcentCalc = () => {
      const startedDate = new Date(startDate).getTime();
      const finaleDate = new Date(endDate).getTime();
      const now = new Date().getTime();

      const totalDuration = finaleDate - startedDate; // durée totale

      // const remainingDuration = finaleDate - now; // durée restante

      const elapsedDuration = now - startedDate; // durée écoulée

      const pourcent = (elapsedDuration * 100) / totalDuration; // pourcentage restant
      const formatPourcent = parseInt(pourcent.toFixed(), 10); // formatage du pourcentage

      // changement de couleur en fonction du pourcentage
      if (formatPourcent <= 0 || formatPourcent < 80) {
        setColor("green");
      } else if (formatPourcent >= 80 && formatPourcent < 90) {
        setColor("yellow");
      } else if (formatPourcent >= 90 && formatPourcent < 98) {
        setColor("orange");
      } else {
        setColor("red");
      }

      setPourcent(formatPourcent);
    };
    pourcentCalc();
    const interval = setInterval(() => {
      pourcentCalc();
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <CircularProgress value={pourcent} color={color}>
      <CircularProgressLabel>
        {image ? (
          <Image src={image} alt="image" title={title} w={width} mx={"auto"} />
        ) : (
          <Text title={title} cursor={"default"}>
            {" "}
            {pourcent}%{" "}
          </Text>
        )}
      </CircularProgressLabel>
    </CircularProgress>
  );
};
export default DisplayPourcentTime;
