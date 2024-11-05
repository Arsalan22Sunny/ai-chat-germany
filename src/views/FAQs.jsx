/* eslint-disable react/prop-types */
import { ArrowDown2 } from "iconsax-react";
import { useState } from "react";
import cn from "../utils/cn";

const Accordion = ({ question, answer, open }) => {
  const [isOpen, setIsOpen] = useState(open || false);
  return (
    <details className="w-full" open={open}>
      <summary
        className="w-full py-5 flex justify-between items-center cursor-pointer"
        onClick={() => {
          setIsOpen(!isOpen);
        }}
      >
        <span className="font-medium text-gray-700">{question}</span>
        <ArrowDown2
          className={cn("size-4 transition-all", isOpen ? "rotate-180" : "")}
        />
      </summary>
      <div className="py-5 border-t border-gray-200">
        <p className="mb-2 text-gray-500">{answer}</p>
      </div>
    </details>
  );
};

const FAQs = () => {
  const faqItems = [
    {
      question: "Kontakt",
      answer:
        "Inhalt: Ein Large Language Model (LLM) ist ein KI-Modell, das auf der Verarbeitung und Generierung von natürlicher Sprache spezialisiert ist. Es nutzt große Mengen an Textdaten, um Sprachmuster zu erkennen und sinnvolle Antworten zu generieren.",
      open: true,
    },
    {
      question: "Impressum",
      answer:
        "Inhalt: LLMs verwenden neuronale Netzwerke, um komplexe Sprachmuster zu lernen. Sie trainieren auf riesigen Textdatensätzen, um Kontexte zu verstehen und relevante Antworten zu liefern. Während des Trainingsprozesses werden die Modelle auf viele Sprachbeispiele aus verschiedenen Quellen ausgebildet, um die Genauigkeit und Relevanz ihrer Antworten zu verbessern.",
      open: false,
    },
    {
      question: "Datenschutz",
      answer:
        "The main difference is that the core components from Micro Components are open source under the MIT license, whereas Tailwind UI is a paid product. Another difference is that Micro Components relies on smaller and standalone components, whereas Tailwind UI offers sections of pages.",
      open: false,
    },
    {
      question: "AGB",
      answer:
        "Inhalt: Die Technologie von LLMs entwickelt sich ständig weiter. Zukünftige Entwicklungen könnten zu noch präziseren und kontextbewussteren Modellen führen. Zudem wird erwartet, dass LLMs zunehmend in personalisierten und spezialisierten Anwendungen eingesetzt werden.",
      open: false,
    },
    {
      question: "Haftungsauschluss",
      answer:
        "Inhalt: Die Technologie von LLMs entwickelt sich ständig weiter. Zukünftige Entwicklungen könnten zu noch präziseren und kontextbewussteren Modellen führen. Zudem wird erwartet, dass LLMs zunehmend in personalisierten und spezialisierten Anwendungen eingesetzt werden.",
      open: false,
    },
    {
      question: "FAQ",
      answer:
        "Inhalt: Die Technologie von LLMs entwickelt sich ständig weiter. Zukünftige Entwicklungen könnten zu noch präziseren und kontextbewussteren Modellen führen. Zudem wird erwartet, dass LLMs zunehmend in personalisierten und spezialisierten Anwendungen eingesetzt werden.",
      open: false,
    },
  ];

  return (
    <div className="px-4 h-full flex flex-col pb-4">
      <div className="max-w-screen-sm mx-auto w-full">
        <h1 className="text-3xl font-bold mb-4 capitalize fixed w-full bg-white">Informationen</h1>
        <div className="w-full divide-y mt-12">
          {faqItems.map((item, index) => (
            <Accordion
              key={index}
              question={item.question}
              answer={item.answer}
              open={item.open}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default FAQs;
