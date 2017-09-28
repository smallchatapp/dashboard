window.createInvoice = function(
  lines, // [{ productName, productDescription, costString}]
  invoiceNumber,
  totalCostString,
  dateString,
  customerName,
  customerAddress,
  callback
) {
  console.log(arguments)
  var docDefinition = {
    footer: {
      columns: [
        { text: "-", style: "documentFooterLeft" },
        { text: "https://small.chat", style: "documentFooterCenter" },
        { text: "-", style: "documentFooterRight" },
      ],
    },
    content: [
      // Header
      {
        columns: [
          {
            image:
              "data:image/jpeg;base64,/9j/4Q24RXhpZgAATU0AKgAAAAgADAEAAAMAAAABAJAAAAEBAAMAAAABAJAAAAECAAMAAAADAAAAngEGAAMAAAABAAIAAAESAAMAAAABAAEAAAEVAAMAAAABAAMAAAEaAAUAAAABAAAApAEbAAUAAAABAAAArAEoAAMAAAABAAIAAAExAAIAAAAkAAAAtAEyAAIAAAAUAAAA2IdpAAQAAAABAAAA7AAAASQACAAIAAgACvyAAAAnEAAK/IAAACcQQWRvYmUgUGhvdG9zaG9wIENDIDIwMTUgKE1hY2ludG9zaCkAMjAxNzowOTowNyAyMDowMDo0MQAABJAAAAcAAAAEMDIyMaABAAMAAAAB//8AAKACAAQAAAABAAAAlqADAAQAAAABAAAAZAAAAAAAAAAGAQMAAwAAAAEABgAAARoABQAAAAEAAAFyARsABQAAAAEAAAF6ASgAAwAAAAEAAgAAAgEABAAAAAEAAAGCAgIABAAAAAEAAAwuAAAAAAAAAEgAAAABAAAASAAAAAH/2P/tAAxBZG9iZV9DTQAC/+4ADkFkb2JlAGSAAAAAAf/bAIQADAgICAkIDAkJDBELCgsRFQ8MDA8VGBMTFRMTGBEMDAwMDAwRDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAENCwsNDg0QDg4QFA4ODhQUDg4ODhQRDAwMDAwREQwMDAwMDBEMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwM/8AAEQgAZACWAwEiAAIRAQMRAf/dAAQACv/EAT8AAAEFAQEBAQEBAAAAAAAAAAMAAQIEBQYHCAkKCwEAAQUBAQEBAQEAAAAAAAAAAQACAwQFBgcICQoLEAABBAEDAgQCBQcGCAUDDDMBAAIRAwQhEjEFQVFhEyJxgTIGFJGhsUIjJBVSwWIzNHKC0UMHJZJT8OHxY3M1FqKygyZEk1RkRcKjdDYX0lXiZfKzhMPTdePzRieUpIW0lcTU5PSltcXV5fVWZnaGlqa2xtbm9jdHV2d3h5ent8fX5/cRAAICAQIEBAMEBQYHBwYFNQEAAhEDITESBEFRYXEiEwUygZEUobFCI8FS0fAzJGLhcoKSQ1MVY3M08SUGFqKygwcmNcLSRJNUoxdkRVU2dGXi8rOEw9N14/NGlKSFtJXE1OT0pbXF1eX1VmZ2hpamtsbW5vYnN0dXZ3eHl6e3x//aAAwDAQACEQMRAD8A9VSSSSUpMnTJKUkkkkpSdDyMijGqddkWNqqZq57yGtH9py5Pqn+M7oGG414gsz7B3rG2v/t2z/vrEQCdlPYJLy7J/wAbPVnk/ZsKipvbeXPP/R9NqqD/ABpfWWZLcYjw2H/0ojwSU+uJLzHF/wAbXUGkfa8Gq1vc1Ocw/wDT9Rq6TpX+Mf6u9Qc2u57sG135t4hk/wDHNln+ekYSHRT1KSZj2WMD2OD2OEtc0yCPIhOmqUkkkkpdJJJJSkkkklP/0PVUkkklKTJ0ySlLB+tP1uwPq7QA/wDT5tgmnGBg/wDGWn8ypWfrL16joPSrM6wb7PoUVfv2H6Df6v5z15N0rpnVvrf1t5e8ussPqZWS7UMZ5f8AUU1J0Y3qdlMcrP8ArH9buoCs78uwmWY9elTB/V+gz/jLF1PSP8VDnNbZ1jK2k6mjHjTydc//AL4xdv0XofTuiYYxMCoMby+w6ve79+x/5yw/rB/jCwuidYHTH4z7gzaci0OA27xu9jCP0m1hTuInSKm3i/UH6qYzQBgtuI/Ouc55/E7UXI6B9T8fYzJw8Kn1DtYHhjS4/wAjdC2q7GW1tsYdzHgOaR3BEgry/wDxsYlzerYmW4l1N1JrZPDXMdueG/1t7U2Nk1ZU9dmf4vfqrlDTE+zu/epc5v4S5i5XrP8AiqzaGut6RkDKaNfQthr/AOzZ/Nv/APA11/1O6zXnfVjEysi0NdS003veQBur9vuc795mx6t4/wBZ/q/lZowMfPptynfRraZkj81r/wCbc7+0lch9FPk/SPrH1/6q5ZxzvbWwxdg3yG/2Qf5p38ti9X+r31j6f1/D+04boe2BdQ76dbvB38n916h9ZPqv076wYpryGhmS0foMlo97D/3+v/g15PVZ1j6ndfMjZkUGHs/MtqP/AFVdjfo/uJ2kvCSn3BJVeldSxuq9Ppz8UzVe3cB3B/OY7+Ux3tVpRqXSSSSUpJJJJT//0fVUkkklKTJ0ySnyX/Gd1d2Z1wYDCTTgNDYHe14D7D/m7GLvPqV0JnReh01lsZOQBdku77nD2s/60z2Ly64ftH66ObbqMjqG13w9Xb/1K9vjSE+egAUpeXf41+nMq6pjdQZH61Wa7B33V/RdH/FvW3/jJ6n9YMGrEZ0x1lONbuF91IJduEbK97RuZ7VwZ+rn1mysa7qV2Le6qphtsuvJBLRq4t9U+o9GArW1PWdG/wAZWB07oGJi5FVuTnUM9MtbAaQ0xUXWO/4P+Sud+tH10zPrHXXRbj1Y9FL99YbLnzG33WOjx/cQvqb0PA691Y4Obc+pvpmyv04l5aRuZudu2+xen4n1G+rOJS+urDY5z2lhtt/SP9w2yDZO139RE8MTtqh8e6fgdS6pcMDAY+95l4pBhun0nncWsXcfVn/Fr1PG6hjdQ6ndXS3GeLRRWS55c3VrXP0Y33Ll+iZFn1e+tlPrEt+y5Bx7/wCoT6Lz/mu3r22y6qphste2tg5c4gD/ADnJTkRt1UyXH/4y+hNz+jnqVbf1np/uJHLqj/Os/sfzi66q6q6sWUvbZW76L2EOafg5qHm0MyMO+h4lttb2OHk5paowaNpfPf8AFR1dwtyuj2OlhH2igHsRDLmj+t7Hr0heLfUG11H1twgPzzZU74Fjv7l7SnTGqgukkkmKUkkkkp//0vVUkkklKTJ0ySnxDqc9J+uV736DGzvV/s7xd/1Dl7c1zXtDmmWuEgjuCvMP8anRXU59PWK2/ocpoqvI7WMHs3f8ZX/1C6T/ABd/WJnVOktwbn/ruA0McCdXVcVW/wDot6fLWIKnrIUbamW1vqsG5ljS1wPcEbXJ3GATExrAXj3V/r99Zs7ItpquOHXvc1tNAh4g7dr7Nbd6bGJKmjiPs+rX1sbvkDAySx/nWTtd/nUuXoHUv8Z/1exZbiCzOeP3BsZ/25bH/ULzDOwuqUhmV1Cm5n2kkstvBBeR9I7rPc5dV9UfqDh9d6ezqWTmuFRc5jqKmgOBafoutfu/6hSSA3KHmuvdVHWOq39RFAxjeQTW0k6gBu7cY9ztqPTh/Wj6xOBrbk57Ww0PcSa2xpG55FTV1/10+pPSem/Vx2V0ygsuxXtdbY5xc51Z/Rv3T+7ua5P/AIpupk15vSnn6BGRUPJ36O3/AKXppcXpsdFO/wDUToHUOhdJfj57x6ttpsFLTubWIDdu7950fmra6rlswumZWU8w2mp75Pk0x/0laXAf40PrEyrGb0LHdNt0PyyPzWD3V1H/AIx3u/qJg9UkvMf4vMZ+T9a8V/akWXPPwaW/9W9ezLgv8VfRX04l/WLmw7K/RY8/6Np97/7dn/ntd6lM2fJS6SSSapSSSSSn/9P1VJJJJSkydMkpqdW6Xi9W6fdgZbd1NzYJ7tP5ljP5bHLxrMxOs/U7rjS1xrvqO6i4D2W1/wDfmP8A8LWvcFQ6z0Tp3W8M4mfXvZyx40ex379b/wA1OjKt9lOd9Vvrl0/6w1Csfq/UGNm3GceY+lZS7/CVrZZ0/BZe7JZj1NveZdaGNDyfN8blyX1a/wAXh6J1r9o2Znr11Bwx2Bu1x3Db+mM7fa39xbH1j+t/S/q/URc71ssia8VhG4/yrP8ARM/rJEC/Sppf4xukWdS+rzrKGGzIw3i5jWiXFv0bg0f1DuWT/imOa3Fz2WVubib2Ore4EDeQRa1s/wAlrETF/wAbPS3gfa8K+l3f0y2wf+i3K3/46P1Ya32syP6oqA/7+jUqqlPV5eJRmYtuLkN303tLLGnu1wgrI+rv1P6T9XrbrsP1H23DaX2kEhk7vTbtDVzuZ/jawWtIwsG2x3Z1rmsH3M9Ry5bq316+snWT9nFn2eqzQY+MCC6fzS/3XPSEJbbKe5+tv1+wukMfidPc3K6idNPdXUf3rXfnP/4JcH9W/q91D61dVfbkOeaN+/OyncmdfTYf9LZ/0FpfVz/Fv1LqDm5HVQ7BxOdh/nnj+r/gf7a9QwOn4fTsVmJhVNpor+ixv/VO/ec5GxEUN1JMbHpxqK8ehorppaGMYOAAIAREklGpdJJJJSkkkklP/9T1VJJJJSkydMkpSSSSSngfrn/jBuwsi7pPSG7Mio7L8pw+iY+hQw/nf8I5cp9X/qn1n6zZByXFzMZ7puzbpduP53p7vdc//oL1bqn1Z6H1a6u/PxGXW1EEP1aSB+ZYWbfUr/kPWjXVXUxtdTQytghrGiAAOzWhPEgBoNVPE3f4pujOA9HLyK3Aak7XAnxja1Vx/iixJ16lbH/Ft/8AJL0FJDjl3U8Xi/4qugVEHIuyMmOxcGD/AMDbu/6S6Ppn1e6N0ofqGHXS7/SAS/8A7dfusWikgZE7lSkkkyClJJJJKXSSSSUpJJJJT//V9VSXyqkkp+qky+VkklP1SkvlZJJT9UpL5WSSU/VSS+VUklP1SkvlZJJT9UpL5WSSU/VKS+VkklP1UkvlVJJT9VJL5VSSU//Z/+0WBlBob3Rvc2hvcCAzLjAAOEJJTQQEAAAAAAAPHAFaAAMbJUccAgAAAmAAADhCSU0EJQAAAAAAEBhpoP2M3+zfZ4yfRLwA28Y4QklNBDoAAAAAAOUAAAAQAAAAAQAAAAAAC3ByaW50T3V0cHV0AAAABQAAAABQc3RTYm9vbAEAAAAASW50ZWVudW0AAAAASW50ZQAAAABDbHJtAAAAD3ByaW50U2l4dGVlbkJpdGJvb2wAAAAAC3ByaW50ZXJOYW1lVEVYVAAAAAEAAAAAAA9wcmludFByb29mU2V0dXBPYmpjAAAADABQAHIAbwBvAGYAIABTAGUAdAB1AHAAAAAAAApwcm9vZlNldHVwAAAAAQAAAABCbHRuZW51bQAAAAxidWlsdGluUHJvb2YAAAAJcHJvb2ZDTVlLADhCSU0EOwAAAAACLQAAABAAAAABAAAAAAAScHJpbnRPdXRwdXRPcHRpb25zAAAAFwAAAABDcHRuYm9vbAAAAAAAQ2xicmJvb2wAAAAAAFJnc01ib29sAAAAAABDcm5DYm9vbAAAAAAAQ250Q2Jvb2wAAAAAAExibHNib29sAAAAAABOZ3R2Ym9vbAAAAAAARW1sRGJvb2wAAAAAAEludHJib29sAAAAAABCY2tnT2JqYwAAAAEAAAAAAABSR0JDAAAAAwAAAABSZCAgZG91YkBv4AAAAAAAAAAAAEdybiBkb3ViQG/gAAAAAAAAAAAAQmwgIGRvdWJAb+AAAAAAAAAAAABCcmRUVW50RiNSbHQAAAAAAAAAAAAAAABCbGQgVW50RiNSbHQAAAAAAAAAAAAAAABSc2x0VW50RiNQeGxAUgAAAAAAAAAAAAp2ZWN0b3JEYXRhYm9vbAEAAAAAUGdQc2VudW0AAAAAUGdQcwAAAABQZ1BDAAAAAExlZnRVbnRGI1JsdAAAAAAAAAAAAAAAAFRvcCBVbnRGI1JsdAAAAAAAAAAAAAAAAFNjbCBVbnRGI1ByY0BZAAAAAAAAAAAAEGNyb3BXaGVuUHJpbnRpbmdib29sAAAAAA5jcm9wUmVjdEJvdHRvbWxvbmcAAAAAAAAADGNyb3BSZWN0TGVmdGxvbmcAAAAAAAAADWNyb3BSZWN0UmlnaHRsb25nAAAAAAAAAAtjcm9wUmVjdFRvcGxvbmcAAAAAADhCSU0D7QAAAAAAEABIAAAAAQABAEgAAAABAAE4QklNBCYAAAAAAA4AAAAAAAAAAAAAP4AAADhCSU0EDQAAAAAABAAAAB44QklNBBkAAAAAAAQAAAAeOEJJTQPzAAAAAAAJAAAAAAAAAAABADhCSU0nEAAAAAAACgABAAAAAAAAAAE4QklNA/UAAAAAAEgAL2ZmAAEAbGZmAAYAAAAAAAEAL2ZmAAEAoZmaAAYAAAAAAAEAMgAAAAEAWgAAAAYAAAAAAAEANQAAAAEALQAAAAYAAAAAAAE4QklNA/gAAAAAAHAAAP////////////////////////////8D6AAAAAD/////////////////////////////A+gAAAAA/////////////////////////////wPoAAAAAP////////////////////////////8D6AAAOEJJTQQAAAAAAAACAAA4QklNBAIAAAAAAAQAAAAAOEJJTQQwAAAAAAACAQE4QklNBC0AAAAAAAYAAQAAAAM4QklNBAgAAAAAABAAAAABAAACQAAAAkAAAAAAOEJJTQQeAAAAAAAEAAAAADhCSU0EGgAAAAADQwAAAAYAAAAAAAAAAAAAAGQAAACWAAAABwB1AG4AbgBhAG0AZQBkAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAABAAAAAAAAAAAAAACWAAAAZAAAAAAAAAAAAAAAAAAAAAABAAAAAAAAAAAAAAAAAAAAAAAAABAAAAABAAAAAAAAbnVsbAAAAAIAAAAGYm91bmRzT2JqYwAAAAEAAAAAAABSY3QxAAAABAAAAABUb3AgbG9uZwAAAAAAAAAATGVmdGxvbmcAAAAAAAAAAEJ0b21sb25nAAAAZAAAAABSZ2h0bG9uZwAAAJYAAAAGc2xpY2VzVmxMcwAAAAFPYmpjAAAAAQAAAAAABXNsaWNlAAAAEgAAAAdzbGljZUlEbG9uZwAAAAAAAAAHZ3JvdXBJRGxvbmcAAAAAAAAABm9yaWdpbmVudW0AAAAMRVNsaWNlT3JpZ2luAAAADWF1dG9HZW5lcmF0ZWQAAAAAVHlwZWVudW0AAAAKRVNsaWNlVHlwZQAAAABJbWcgAAAABmJvdW5kc09iamMAAAABAAAAAAAAUmN0MQAAAAQAAAAAVG9wIGxvbmcAAAAAAAAAAExlZnRsb25nAAAAAAAAAABCdG9tbG9uZwAAAGQAAAAAUmdodGxvbmcAAACWAAAAA3VybFRFWFQAAAABAAAAAAAAbnVsbFRFWFQAAAABAAAAAAAATXNnZVRFWFQAAAABAAAAAAAG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MgAwADEANQAAAAEAOEJJTQRAAAAAAABwAAAAEAAAAAEAAAAAAABudWxsAAAAAQAAAABudWxsb2JqIAAAAAJFbm1yAAAAAQAAAAAAAFBhdGgAAAAAUGF0aAAAAAp2ZWN0b3JNYXNrRW5tcgAAAAEAAAAAAABMeXIgAAAAAE9yZG4AAAAAVHJndDhCSU0EBgAAAAAABwAGAAAAAQEA/+ENr2h0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8APD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMwNjcgNzkuMTU3NzQ3LCAyMDE1LzAzLzMwLTIzOjQwOjQyICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RFdnQ9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZUV2ZW50IyIgeG1sbnM6ZGM9Imh0dHA6Ly9wdXJsLm9yZy9kYy9lbGVtZW50cy8xLjEvIiB4bWxuczpwaG90b3Nob3A9Imh0dHA6Ly9ucy5hZG9iZS5jb20vcGhvdG9zaG9wLzEuMC8iIHhtbG5zOnhtcD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLyIgeG1wTU06RG9jdW1lbnRJRD0iYWRvYmU6ZG9jaWQ6cGhvdG9zaG9wOjM1YjE0YTg2LWQyODEtMTE3YS05ZTYwLWZiYjUzMGMxOTAyZCIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDowMzY2NzU2Ny0yMzg1LTQ1YjEtOTQwNi1jOTZkZGFiM2RjMTIiIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0iODQ5M0I1RjlGOTZBNzlDQjU3NENEQkQ1RjdFQkZFOUYiIGRjOmZvcm1hdD0iaW1hZ2UvanBlZyIgcGhvdG9zaG9wOkNvbG9yTW9kZT0iMyIgeG1wOkNyZWF0ZURhdGU9IjIwMTctMDktMDdUMTk6NTk6NDYtMDQ6MDAiIHhtcDpNb2RpZnlEYXRlPSIyMDE3LTA5LTA3VDIwOjAwOjQxLTA0OjAwIiB4bXA6TWV0YWRhdGFEYXRlPSIyMDE3LTA5LTA3VDIwOjAwOjQxLTA0OjAwIj4gPHhtcE1NOkhpc3Rvcnk+IDxyZGY6U2VxPiA8cmRmOmxpIHN0RXZ0OmFjdGlvbj0ic2F2ZWQiIHN0RXZ0Omluc3RhbmNlSUQ9InhtcC5paWQ6ZmViNDBjODItM2IzYy00MzI0LWE5NGUtZjdmNmM2ZGYyNzE1IiBzdEV2dDp3aGVuPSIyMDE3LTA5LTA3VDIwOjAwOjQxLTA0OjAwIiBzdEV2dDpzb2Z0d2FyZUFnZW50PSJBZG9iZSBQaG90b3Nob3AgQ0MgMjAxNSAoTWFjaW50b3NoKSIgc3RFdnQ6Y2hhbmdlZD0iLyIvPiA8cmRmOmxpIHN0RXZ0OmFjdGlvbj0ic2F2ZWQiIHN0RXZ0Omluc3RhbmNlSUQ9InhtcC5paWQ6MDM2Njc1NjctMjM4NS00NWIxLTk0MDYtYzk2ZGRhYjNkYzEyIiBzdEV2dDp3aGVuPSIyMDE3LTA5LTA3VDIwOjAwOjQxLTA0OjAwIiBzdEV2dDpzb2Z0d2FyZUFnZW50PSJBZG9iZSBQaG90b3Nob3AgQ0MgMjAxNSAoTWFjaW50b3NoKSIgc3RFdnQ6Y2hhbmdlZD0iLyIvPiA8L3JkZjpTZXE+IDwveG1wTU06SGlzdG9yeT4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAg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",
            width: 75,
          },

          [
            {
              text: "INVOICE",
              style: "invoiceTitle",
              width: "*",
            },
            {
              stack: [
                {
                  columns: [
                    {
                      text: "Invoice #",
                      style: "invoiceSubTitle",
                      width: "*",
                    },
                    {
                      text: invoiceNumber,
                      style: "invoiceSubValue",
                      width: 150,
                    },
                  ],
                },
                {
                  columns: [
                    {
                      text: "Date Issued",
                      style: "invoiceSubTitle",
                      width: "*",
                    },
                    {
                      text: dateString,
                      style: "invoiceSubValue",
                      width: 150,
                    },
                  ],
                },
                {
                  columns: [
                    {
                      text: "Due Date",
                      style: "invoiceSubTitle",
                      width: "*",
                    },
                    {
                      text: dateString,
                      style: "invoiceSubValue",
                      width: 150,
                    },
                  ],
                },
              ],
            },
          ],
        ],
      },
      // Billing Headers
      {
        columns: [
          {
            text: "Billing From",
            style: "invoiceBillingTitle",
          },
          {
            text: "Billing To",
            style: "invoiceBillingTitle",
          },
        ],
      },
      // Billing Details
      {
        columns: [
          {
            text: "Nicer LLC",
            style: "invoiceBillingDetails",
          },
          {
            text: customerName,
            style: "invoiceBillingDetails",
          },
        ],
      },
      // Billing Address Title
      {
        columns: [
          {
            text: "Address",
            style: "invoiceBillingAddressTitle",
          },
          {
            text: customerAddress ? "Address" : "",
            style: "invoiceBillingAddressTitle",
          },
        ],
      },
      // Billing Address
      {
        columns: [
          {
            text: "204 Catskill Drive \n Taylors, SC 29687",
            style: "invoiceBillingAddress",
          },
          {
            text: customerAddress || "---",
            style: "invoiceBillingAddress",
          },
        ],
      },
      // Line breaks
      "\n\n",
      // Items
      {
        table: {
          // headers are automatically repeated if the table spans over multiple pages
          // you can declare how many rows should be treated as headers
          headerRows: 1,
          widths: ["*", 40, "auto", 40, "auto", 80],

          body: [
            // Table Header
            [
              {
                text: "Product",
                style: "itemsHeader",
              },
              {
                text: "Qty",
                style: ["itemsHeader", "center"],
              },
              {
                text: "Price",
                style: ["itemsHeader", "center"],
              },
              {
                text: "Tax",
                style: ["itemsHeader", "center"],
              },
              {
                text: "Discount",
                style: ["itemsHeader", "center"],
              },
              {
                text: "Total",
                style: ["itemsHeader", "center"],
              },
            ],
          ].concat(
            lines.map(function(line) {
              return [
                [
                  {
                    text: line.productName,
                    style: "itemTitle",
                  },
                  {
                    text: line.productDescription,
                    style: "itemSubTitle",
                  },
                ],
                {
                  text: "1",
                  style: "itemNumber",
                },
                {
                  text: line.costString,
                  style: "itemNumber",
                },
                {
                  text: "0%",
                  style: "itemNumber",
                },
                {
                  text: "0%",
                  style: "itemNumber",
                },
                {
                  text: line.costString,
                  style: "itemTotal",
                },
              ]
            })
          ),
        }, // table
        //  layout: 'lightHorizontalLines'
      },
      // TOTAL
      {
        table: {
          // headers are automatically repeated if the table spans over multiple pages
          // you can declare how many rows should be treated as headers
          headerRows: 0,
          widths: ["*", 80],

          body: [
            // Total
            /*
              [
                  {
                      text:'Subtotal',
                      style:'itemsFooterSubTitle'
                  },
                  {
                      text:'$2000.00',
                      style:'itemsFooterSubValue'
                  }
              ],
              [
                  {
                      text:'Tax 21%',
                      style:'itemsFooterSubTitle'
                  },
                  {
                      text: '$523.13',
                      style:'itemsFooterSubValue'
                  }
              ],
              */
            [
              {
                text: "TOTAL",
                style: "itemsFooterTotalTitle",
              },
              {
                text: totalCostString,
                style: "itemsFooterTotalValue",
              },
            ],
          ],
        }, // table
        layout: "lightHorizontalLines",
      },
      // Signature
      /*
      {
          columns: [
              {
                  text:'',
              },
              {
                  stack: [
                      {
                          text: '_________________________________',
                          style:'signaturePlaceholder'
                      },
                      {
                          text: 'Your Name',
                          style:'signatureName'

                      },
                      {
                          text: 'Your job title',
                          style:'signatureJobTitle'

                      }
                      ],
                 width: 180
              },
          ]
      },
      */
      {
        text: "NOTES",
        style: "notesTitle",
      },
      {
        text:
          "For any questions about billing or invoices, contact us at support@small.chat",
        style: "notesText",
      },
    ],
    styles: {
      // Document Header
      documentHeaderLeft: {
        fontSize: 10,
        margin: [5, 5, 5, 5],
        alignment: "left",
      },
      documentHeaderCenter: {
        fontSize: 10,
        margin: [5, 5, 5, 5],
        alignment: "center",
      },
      documentHeaderRight: {
        fontSize: 10,
        margin: [5, 5, 5, 5],
        alignment: "right",
      },
      // Document Footer
      documentFooterLeft: {
        fontSize: 10,
        margin: [5, 5, 5, 5],
        alignment: "left",
      },
      documentFooterCenter: {
        fontSize: 10,
        margin: [5, 5, 5, 5],
        alignment: "center",
      },
      documentFooterRight: {
        fontSize: 10,
        margin: [5, 5, 5, 5],
        alignment: "right",
      },
      // Invoice Title
      invoiceTitle: {
        fontSize: 22,
        bold: true,
        alignment: "right",
        margin: [0, 0, 0, 15],
      },
      // Invoice Details
      invoiceSubTitle: {
        fontSize: 12,
        alignment: "right",
      },
      invoiceSubValue: {
        fontSize: 12,
        alignment: "right",
      },
      // Billing Headers
      invoiceBillingTitle: {
        fontSize: 14,
        bold: true,
        alignment: "left",
        margin: [0, 20, 0, 5],
      },
      // Billing Details
      invoiceBillingDetails: {
        alignment: "left",
      },
      invoiceBillingAddressTitle: {
        margin: [0, 7, 0, 3],
        bold: true,
      },
      invoiceBillingAddress: {},
      // Items Header
      itemsHeader: {
        margin: [0, 5, 0, 5],
        bold: true,
      },
      // Item Title
      itemTitle: {
        bold: true,
      },
      itemSubTitle: {
        italics: true,
        fontSize: 11,
      },
      itemNumber: {
        margin: [0, 5, 0, 5],
        alignment: "center",
      },
      itemTotal: {
        margin: [0, 5, 0, 5],
        bold: true,
        alignment: "center",
      },

      // Items Footer (Subtotal, Total, Tax, etc)
      itemsFooterSubTitle: {
        margin: [0, 5, 0, 5],
        bold: true,
        alignment: "right",
      },
      itemsFooterSubValue: {
        margin: [0, 5, 0, 5],
        bold: true,
        alignment: "center",
      },
      itemsFooterTotalTitle: {
        margin: [0, 5, 0, 5],
        bold: true,
        alignment: "right",
      },
      itemsFooterTotalValue: {
        margin: [0, 5, 0, 5],
        bold: true,
        alignment: "center",
      },
      signaturePlaceholder: {
        margin: [0, 70, 0, 0],
      },
      signatureName: {
        bold: true,
        alignment: "center",
      },
      signatureJobTitle: {
        italics: true,
        fontSize: 10,
        alignment: "center",
      },
      notesTitle: {
        fontSize: 10,
        bold: true,
        margin: [0, 50, 0, 3],
      },
      notesText: {
        fontSize: 10,
      },
      center: {
        alignment: "center",
      },
    },
    defaultStyle: {
      columnGap: 20,
    },
  }

  try {
    console.log(docDefinition)
    window.pdfMake
      .createPdf(docDefinition)
      .download("Invoice_" + name + ".pdf", callback)
  } catch (e) {
    console.log(e)
    callback()
  }
}
