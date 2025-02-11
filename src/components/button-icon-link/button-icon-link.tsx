import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHandshake, faQuestion, faVideo, IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { faSkype, faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import { faFileLines } from "@fortawesome/free-regular-svg-icons";

interface buttonIconLinkProps {
  icon: IconEnum;
  label: string;
  urlLink: string;
}

export enum IconEnum {
  SKYPE = "skype",
  QUESTION = "question",
  FILE = "file",
  VIDEO = "video",
  PARTNER = "partner",
  WHATSAPP = "whatsapp",
}

const ButtonIconLink = ({ icon, label, urlLink }: buttonIconLinkProps) => {
  // Create a mapping from enum to icons
  const iconMap: { [key in IconEnum]: IconDefinition } = {
    [IconEnum.SKYPE]: faSkype,
    [IconEnum.QUESTION]: faQuestion,
    [IconEnum.FILE]: faFileLines,
    [IconEnum.VIDEO]: faVideo,
    [IconEnum.PARTNER]: faHandshake,
    [IconEnum.WHATSAPP]: faWhatsapp,
  };

  const getIcon = (iconName: IconEnum): IconDefinition => {
    return iconMap[iconName];
  };

  const iconToBeUsed = getIcon(icon);

  return (
    <div className="button--icon--link" onClick={() => window.open(urlLink, "_blank")}>
      <div className="button--icon--link__icon">
        <FontAwesomeIcon icon={iconToBeUsed} />
      </div>
      <div className="button--icon--link__label">{label}</div>
    </div>
  );
};

export default ButtonIconLink;
