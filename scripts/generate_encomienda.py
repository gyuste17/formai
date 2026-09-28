import os
import docx
from docx.shared import Inches, Pt, RGBColor
from docx.enum.text import WD_ALIGN_PARAGRAPH
from docx.enum.table import WD_TABLE_ALIGNMENT
from docx.oxml import parse_xml, OxmlElement
from docx.oxml.ns import nsdecls, qn
from docx2pdf import convert
import pypdf

COLOR_TEAL = RGBColor(41, 151, 170)
COLOR_NAVY = RGBColor(15, 23, 42)
COLOR_GRAY = RGBColor(100, 116, 139)
HEX_TEAL = "2997AA"
HEX_NAVY = "0F172A"
HEX_LIGHT_BG = "F8FAFC"
HEX_BORDER = "CBD5E1"

def generate_encomienda():
    doc = docx.Document()
    
    # 1-page fit margins
    for s in doc.sections:
        s.top_margin = Inches(0.48)
        s.bottom_margin = Inches(0.48)
        s.left_margin = Inches(0.70)
        s.right_margin = Inches(0.70)

    # Header Table: 100% Textual / Sin logo para evitar descuadres o cortes
    header_tbl = doc.add_table(rows=1, cols=2)
    header_tbl.alignment = WD_TABLE_ALIGNMENT.CENTER
    header_tbl.autofit = False
    header_tbl.columns[0].width = Inches(2.8)
    header_tbl.columns[1].width = Inches(4.3)

    c_left = header_tbl.cell(0, 0)
    c_right = header_tbl.cell(0, 1)

    for c in [c_left, c_right]:
        tcPr = c._tc.get_or_add_tcPr()
        borders = parse_xml(f'<w:tcBorders {nsdecls("w")}><w:top w:val="none"/><w:left w:val="none"/><w:bottom w:val="none"/><w:right w:val="none"/></w:tcBorders>')
        tcPr.append(borders)

    # Entidad Organizadora (Izquierda)
    p_brand = c_left.paragraphs[0]
    p_brand.alignment = WD_ALIGN_PARAGRAPH.LEFT
    p_brand.paragraph_format.space_after = Pt(0)
    r1_l = p_brand.add_run("FULL EQUIPE, S.L.\n")
    r1_l.font.name = "Arial"
    r1_l.font.size = Pt(12)
    r1_l.font.bold = True
    r1_l.font.color.rgb = COLOR_NAVY

    r2_l = p_brand.add_run("Entidad Organizadora Homologada ante FUNDAE\n")
    r2_l.font.name = "Arial"
    r2_l.font.size = Pt(8)
    r2_l.font.bold = True
    r2_l.font.color.rgb = COLOR_TEAL

    r3_l = p_brand.add_run("CIF: B-85124428")
    r3_l.font.name = "Arial"
    r3_l.font.size = Pt(7.5)
    r3_l.font.color.rgb = COLOR_GRAY

    # Título Oficial (Derecha)
    p_title = c_right.paragraphs[0]
    p_title.alignment = WD_ALIGN_PARAGRAPH.RIGHT
    p_title.paragraph_format.space_after = Pt(0)
    r1_r = p_title.add_run("DOCUMENTO DE ADHESIÓN\n")
    r1_r.font.name = "Arial"
    r1_r.font.size = Pt(12)
    r1_r.font.bold = True
    r1_r.font.color.rgb = COLOR_NAVY

    r2_r = p_title.add_run("Contrato de Encomienda de Organización de la Formación\n")
    r2_r.font.name = "Arial"
    r2_r.font.size = Pt(9)
    r2_r.font.bold = True
    r2_r.font.color.rgb = COLOR_TEAL

    r3_r = p_title.add_run("Ley 30/2015, de 9 de septiembre · Real Decreto 694/2017")
    r3_r.font.name = "Arial"
    r3_r.font.size = Pt(8)
    r3_r.font.color.rgb = COLOR_GRAY

    # Teal Divider Line
    p_div = doc.add_paragraph()
    p_div.paragraph_format.space_before = Pt(3)
    p_div.paragraph_format.space_after = Pt(7)
    p_bdr = parse_xml(f'<w:pBdr {nsdecls("w")}><w:bottom w:val="single" w:sz="12" w:space="1" w:color="{HEX_TEAL}"/></w:pBdr>')
    p_div._p.get_or_add_pPr().append(p_bdr)

    # Intro Paragraph
    p_intro = doc.add_paragraph()
    p_intro.paragraph_format.space_after = Pt(6)
    r_intro = p_intro.add_run(
        "Documento de adhesión al Contrato de Encomienda de Organización de la Formación suscrito entre empresas "
        "al amparo de la Ley 30/2015, de 9 de septiembre, por la que se regula el Sistema de Formación Profesional para el Empleo "
        "en el ámbito laboral, formalizado entre la entidad organizadora acreditada FULL EQUIPE, S.L. (CIF B-85124428) y la empresa participante:"
    )
    r_intro.font.name = "Arial"
    r_intro.font.size = Pt(8.2)
    r_intro.font.color.rgb = COLOR_NAVY

    # CAJITA VISUAL PARA RELLENAR DATOS DE LA EMPRESA (SIN CUENTA DE COTIZACIÓN)
    tbl_data = doc.add_table(rows=5, cols=2)
    tbl_data.alignment = WD_TABLE_ALIGNMENT.CENTER
    tbl_data.columns[0].width = Inches(4.5)
    tbl_data.columns[1].width = Inches(2.6)

    # Fila 0: Barra superior de la cajita (Merged header)
    cell_card_title = tbl_data.cell(0, 0)
    cell_card_title.merge(tbl_data.cell(0, 1))
    cell_card_title._tc.get_or_add_tcPr().append(parse_xml(f'<w:shd {nsdecls("w")} w:fill="{HEX_NAVY}"/>'))
    
    # Bordes exteriores de la cabecera de la caja
    bdr_head = parse_xml(f'<w:tcBorders {nsdecls("w")}><w:top w:val="single" w:sz="6" w:space="0" w:color="{HEX_BORDER}"/><w:left w:val="single" w:sz="6" w:space="0" w:color="{HEX_BORDER}"/><w:bottom w:val="single" w:sz="4" w:space="0" w:color="{HEX_TEAL}"/><w:right w:val="single" w:sz="6" w:space="0" w:color="{HEX_BORDER}"/></w:tcBorders>')
    cell_card_title._tc.get_or_add_tcPr().append(bdr_head)
    
    tcMar_h = OxmlElement('w:tcMar')
    for m, val in [('top', 40), ('bottom', 40), ('left', 90), ('right', 90)]:
        node = OxmlElement(f'w:{m}')
        node.set(qn('w:w'), str(val))
        node.set(qn('w:type'), 'dxa')
        tcMar_h.append(node)
    cell_card_title._tc.get_or_add_tcPr().append(tcMar_h)

    p_card = cell_card_title.paragraphs[0]
    p_card.paragraph_format.space_before = Pt(2)
    p_card.paragraph_format.space_after = Pt(2)
    r_card = p_card.add_run("DATOS DE LA EMPRESA BENEFICIARIA Y DEL REPRESENTANTE LEGAL")
    r_card.font.name = "Arial"
    r_card.font.size = Pt(7.8)
    r_card.font.bold = True
    r_card.font.color.rgb = RGBColor(255, 255, 255)

    # Filas de datos (4 filas x 2 columnas - SIN CCC)
    field_rows = [
        ("Nombre y Apellidos del Representante Legal:", "D./Dña. _____________________________________________", "NIF / NIE del Representante:", "_____________________"),
        ("Facultad que ostenta:", "[  ] Administrador Único / Solidario    [  ] Apoderado", "Acreditado mediante:", "Escritura / Notaría _________"),
        ("Razón Social de la Empresa Beneficiaria:", "_____________________________________________", "CIF de la Empresa:", "_____________________"),
        ("Domicilio Social (Calle, Nº, CP y Municipio):", "_____________________________________________", "Provincia:", "_____________________")
    ]

    for row_idx, f_row in enumerate(field_rows, start=1):
        for col_idx in [0, 1]:
            cell = tbl_data.cell(row_idx, col_idx)
            shd = parse_xml(f'<w:shd {nsdecls("w")} w:fill="{HEX_LIGHT_BG}"/>')
            cell._tc.get_or_add_tcPr().append(shd)

            # Bordes estilizados de formulario
            bdr = parse_xml(f'<w:tcBorders {nsdecls("w")}><w:top w:val="single" w:sz="4" w:space="0" w:color="{HEX_BORDER}"/><w:left w:val="single" w:sz="6" w:space="0" w:color="{HEX_BORDER}"/><w:bottom w:val="single" w:sz="4" w:space="0" w:color="{HEX_BORDER}"/><w:right w:val="single" w:sz="6" w:space="0" w:color="{HEX_BORDER}"/></w:tcBorders>')
            cell._tc.get_or_add_tcPr().append(bdr)

            tcMar = OxmlElement('w:tcMar')
            for m, val in [('top', 45), ('bottom', 45), ('left', 90), ('right', 90)]:
                n = OxmlElement(f'w:{m}')
                n.set(qn('w:w'), str(val))
                n.set(qn('w:type'), 'dxa')
                tcMar.append(n)
            cell._tc.get_or_add_tcPr().append(tcMar)

            p = cell.paragraphs[0]
            p.paragraph_format.space_before = Pt(0)
            p.paragraph_format.space_after = Pt(0)
            lbl = f_row[col_idx * 2]
            val = f_row[col_idx * 2 + 1]

            run_lbl = p.add_run(lbl + "\n")
            run_lbl.font.name = "Arial"
            run_lbl.font.size = Pt(7.2)
            run_lbl.font.bold = True
            run_lbl.font.color.rgb = COLOR_NAVY

            run_val = p.add_run(val)
            run_val.font.name = "Arial"
            run_val.font.size = Pt(7.8)
            run_val.font.color.rgb = COLOR_GRAY

    # Heading: DECLARA
    p_dec = doc.add_paragraph()
    p_dec.paragraph_format.space_before = Pt(7)
    p_dec.paragraph_format.space_after = Pt(3)
    r_dec = p_dec.add_run("DECLARA Y MANIFIESTA:")
    r_dec.font.name = "Arial"
    r_dec.font.size = Pt(8.2)
    r_dec.font.bold = True
    r_dec.font.color.rgb = COLOR_NAVY

    clauses = [
        ("PRIMERO.", "Que la citada empresa está interesada y formaliza por el presente acto su adhesión al Contrato suscrito con la entidad externa organizadora acreditada FULL EQUIPE, S.L. (con CIF B-85124428), para la organización, gestión y comunicación de la formación programada en dicha empresa al amparo de la Ley 30/2015 y Real Decreto 694/2017."),
        ("SEGUNDO.", "Que conoce y acepta el contenido íntegro de las condiciones, derechos y obligaciones fijadas en la normativa reguladora del Sistema de Formación Profesional para el Empleo en el ámbito laboral y en el referido contrato de encomienda."),
        ("TERCERO.", "Que por el presente documento acepta expresamente las obligaciones derivadas de dicha encomienda, autorizando a la entidad organizadora a la consulta del saldo de crédito formativo anual disponible ante el aplicativo oficial del SEPE / FUNDAE y a la comunicación telemática de las acciones formativas, surtiendo efectos desde el momento de su firma.")
    ]

    for num, txt in clauses:
        p_c = doc.add_paragraph()
        p_c.paragraph_format.left_indent = Inches(0.12)
        p_c.paragraph_format.space_after = Pt(2.2)
        r_n = p_c.add_run(num + " ")
        r_n.font.name = "Arial"
        r_n.font.size = Pt(7.6)
        r_n.font.bold = True
        r_t = p_c.add_run(txt)
        r_t.font.name = "Arial"
        r_t.font.size = Pt(7.6)
        r_t.font.color.rgb = COLOR_NAVY

    # Date
    p_date = doc.add_paragraph()
    p_date.paragraph_format.space_before = Pt(5)
    p_date.paragraph_format.space_after = Pt(4)
    r_d = p_date.add_run("En _____________________________, a ______ de ___________________ de 2026.")
    r_d.font.name = "Arial"
    r_d.font.size = Pt(8.2)
    r_d.font.bold = True

    # Signature Table (Empresa + Full Equipe)
    tbl_sig = doc.add_table(rows=1, cols=2)
    tbl_sig.alignment = WD_TABLE_ALIGNMENT.CENTER
    tbl_sig.columns[0].width = Inches(3.5)
    tbl_sig.columns[1].width = Inches(3.5)

    c_s1 = tbl_sig.cell(0, 0)
    c_s2 = tbl_sig.cell(0, 1)

    for cell in [c_s1, c_s2]:
        tcPr = cell._tc.get_or_add_tcPr()
        bdr = parse_xml(f'<w:tcBorders {nsdecls("w")}><w:top w:val="single" w:sz="6" w:space="0" w:color="{HEX_BORDER}"/><w:left w:val="single" w:sz="6" w:space="0" w:color="{HEX_BORDER}"/><w:bottom w:val="single" w:sz="6" w:space="0" w:color="{HEX_BORDER}"/><w:right w:val="single" w:sz="6" w:space="0" w:color="{HEX_BORDER}"/></w:tcBorders>')
        tcPr.append(bdr)
        
        tcMar = OxmlElement('w:tcMar')
        for m, val in [('top', 80), ('bottom', 80), ('left', 100), ('right', 100)]:
            n = OxmlElement(f'w:{m}')
            n.set(qn('w:w'), str(val))
            n.set(qn('w:type'), 'dxa')
            tcMar.append(n)
        tcPr.append(tcMar)

    p_s1 = c_s1.paragraphs[0]
    p_s1.paragraph_format.space_after = Pt(0)
    p_s1.add_run("POR LA EMPRESA BENEFICIARIA (CLIENTE)\n").font.size = Pt(7.8)
    p_s1.runs[0].font.bold = True
    p_s1.add_run("(Representante Legal / Apoderado)\n\n\n\nFirma y Sello de la Empresa:\n_______________________________________").font.size = Pt(7.2)

    p_s2 = c_s2.paragraphs[0]
    p_s2.paragraph_format.space_after = Pt(0)
    p_s2.add_run("POR LA ENTIDAD ORGANIZADORA ACREDITADA\n").font.size = Pt(7.8)
    p_s2.runs[0].font.bold = True
    p_s2.add_run("FULL EQUIPE, S.L. (CIF B-85124428)\n\n\n\nFirma y Sello de la Entidad:\n_______________________________________").font.size = Pt(7.2)

    # Footnote
    p_foot = doc.add_paragraph()
    p_foot.paragraph_format.space_before = Pt(6)
    p_foot.paragraph_format.space_after = Pt(0)
    p_foot.alignment = WD_ALIGN_PARAGRAPH.CENTER
    r_foot = p_foot.add_run("FULL EQUIPE, S.L. · Entidad Organizadora Homologada ante el SEPE y FUNDAE (CIF B-85124428)")
    r_foot.font.name = "Arial"
    r_foot.font.size = Pt(7)
    r_foot.font.italic = True
    r_foot.font.color.rgb = COLOR_GRAY

    # Guardar en todas las ubicaciones correspondientes
    target_files = [
        # 1. En carpeta maestra de Plantillas Oficiales FormAI
        r"C:\Users\gyust\OneDrive - guillermoyuste.es\1. GYusteWebs\formai.es\4. Gestión FUNDAE y Plantillas\Plantillas Oficiales FormAI\1. Encomienda de Gestión\Encomienda de Gestión - Full Equipe 2026.docx",
        r"C:\Users\gyust\OneDrive - guillermoyuste.es\1. GYusteWebs\formai.es\4. Gestión FUNDAE y Plantillas\Plantillas Oficiales FormAI\1. Encomienda de Gestión\Encomienda de Gestión FUNDAE - FULL EQUIPE (Plantilla Oficial).docx",
        r"C:\Users\gyust\OneDrive - guillermoyuste.es\1. GYusteWebs\formai.es\4. Gestión FUNDAE y Plantillas\Plantillas Oficiales FormAI\1. Encomienda de Gestión\Versión Sin Logo\Encomienda de Gestión - Full Equipe 2026.docx",
        # 2. En carpeta sincronizada 4.1 Documentos Clientes
        r"C:\Users\gyust\OneDrive - guillermoyuste.es\1. GYusteWebs\formai.es\4.1 Documentos Clientes FormAI\1. Encomienda de Gestión - Consulta Crédito\Encomienda de Gestión - Full Equipe 2026.docx",
        r"C:\Users\gyust\OneDrive - guillermoyuste.es\1. GYusteWebs\formai.es\4.1 Documentos Clientes FormAI\1. Encomienda de Gestión - Consulta Crédito\Versión Sin Logo\Encomienda de Gestión - Full Equipe 2026.docx"
    ]

    for t_docx in target_files:
        os.makedirs(os.path.dirname(t_docx), exist_ok=True)
        doc.save(t_docx)
        print("Generated DOCX:", t_docx)
        try:
            convert(t_docx)
            pdf_path = t_docx.replace(".docx", ".pdf")
            print("Generated PDF:", pdf_path)
            # Verificar número de páginas
            reader = pypdf.PdfReader(pdf_path)
            print(f"-> Páginas: {len(reader.pages)}")
        except Exception as e:
            print("PDF conversion note:", e)

if __name__ == "__main__":
    generate_encomienda()
