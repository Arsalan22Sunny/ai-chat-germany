function chatGrouping(messages) {
    const groups = [];
    let lastMessage = null;

    messages.forEach((message) => {
        if (lastMessage && lastMessage.type === message.type) {
            const lastIndex = groups.length - 1;
            const { content } = message;

            if (Array.isArray(groups[lastIndex].content)) {
                groups[lastIndex].content.push(content);
            } else {
                groups[lastIndex].content = [content];
            }
        } else {
            groups.push(message);
        }
        lastMessage = message;
    });

    return groups;
}

// // Testing
// const messages = [
//     {
//         "type": "answer",
//         "content": {
//             "text": "Hello! How can I assist you today?"
//         }
//     },
//     {
//         "type": "source",
//         "content": {
//             "document_id": "acd2c34e-61db-42f1-a905-098fce8d9c27",
//             "score": 0.19447212999999997,
//             "text": "Mai 2010 an der Universität Lüneburg den\nHochschulgrad Bachelor of Arts im Studiengang Betriebswirtschaftslehre erwarb, auch die in der \"Satzung zur Regelung der\nVergabe von Studienplätzen für den Masterstudiengang Management und Marketing des Fachbereichs",
//             "page_label": "7",
//             "filename": "VG Berlin, Beschluss vom 10.02.2011 - 3 L 408.10.pdf"
//         }
//     },
//     {
//         "type": "source",
//         "content": {
//             "document_id": "48a54ddf-277f-422f-8b79-abab63501639",
//             "score": 0.18898579999999998,
//             "text": "4,81\n0,0300\nInternationales Management (DFS)\n4,89\n0,0111\nInternational Economics (MA)\n1,38\n0,0300\nInternational Management (MA)\n2,07\n0,0899\nM.A. Chinese - European Economics and Business Administration (CEEBS)\n1,72\n0,0214\nMBA European Management\n2,55\n0,0214\nMBA European-Asian Programme\n2,44\n0,0214\nMBA Entrepreneurship\n2,22\n0,0214\nMBA Health Care Management\n1,72\n0,0300\nMBA General Management (Dual Award)\n1,78\n0,0214\nM.A. Labour Policies and Globalisation\n1,00\n0,0171\nM.A. Nachhaltigkeits- und Qualitätsmanagement (Zertifikat)",
//             "page_label": "10",
//             "filename": "VG Berlin, Beschluss vom 16.03.2010 - 3 L 576.09.pdf"
//         }
//     },
//     {
//         "type": "source",
//         "content": {
//             "document_id": "e773f303-d9d4-4b9b-bbed-420b141a41a6",
//             "score": 0.1861737,
//             "text": "heute: Verordnung über die Prüfung zum Erwerb der allgemeinen Hochschulreife von",
//             "page_label": "11",
//             "filename": "VG Berlin, Urteil vom 25.10.2011 - 3 A 680.05.pdf"
//         }
//     },
//     {
//         "type": "source",
//         "content": {
//             "document_id": "db56bde2-3225-4d56-a928-8ee787444df8",
//             "score": 0.18503314000000004,
//             "text": "Bildungsmanagement (Master)\n0,1444\n15,5\n2,2382\nWirtschaftsmathematik (Bachelor)\n0,7133\n100,5\n71,6867\nWirtschaftsmathematik (Master)\n0,0900\n20,5\n1,8450\nNaturwiss. in der Informationsgesellschaft\n0,0300\n22,5\n0,6750\nElektrotechnik\n0,0400\n95,5\n3,8200\nInformatik\n0,0413\n105,5\n4,3572\nPhysikalische Ingenieurwiss. (Master)\n0,0127\n10\n0,1270\nVerkehrswesen\n0,0152\n244\n3,7088\nFahrzeugtechnik (Master)",
//             "page_label": "4",
//             "filename": "VG Berlin, Beschluss vom 20.05.2011 - 12 L 595.11.pdf"
//         }
//     },
//     {
//         "type": "source",
//         "content": {
//             "document_id": "52c11063-6dc0-4537-b497-aed1f65be7ce",
//             "score": 0.1838183,
//             "text": "2 LVVO); (wie WS 2007/2008)\n3,00\nS.\nBeauftragte des Fachbereichsrates des Fachbereichs I(Wirtschaftswissenschaften) für den Studiengang \"International\nBusiness (IBU)\"\n2,00 \n(s. u.)\nS.\nBeauftragter des Institutsrates des IMB für das MBA European-Asian Programm",
//             "page_label": "4",
//             "filename": "VG Berlin, Beschluss vom 16.03.2010 - 3 L 576.09.pdf"
//         }
//     },
//     {
//         "type": "question",
//         "content": {
//             "text": "hi"
//         }
//     }
// ]
// const data = chatGrouping(messages)
// data.forEach(element => {
//     if (element.type == 'source') {
//         console.log(element)
//     }
// });

export { chatGrouping }