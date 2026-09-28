import os
import docx
from docx.shared import Inches, Pt, RGBColor
from docx.enum.text import WD_ALIGN_PARAGRAPH
from docx.enum.table import WD_TABLE_ALIGNMENT
from docx.oxml import parse_xml, OxmlElement
from docx.oxml.ns import nsdecls, qn
from docx2pdf import convert
import openpyxl
from openpyxl.styles import Font, PatternFill, Alignment, Border, Side

COLOR_TEAL = RGBColor(41, 151, 170)
COLOR_NAVY = RGBColor(15, 23, 42)
COLOR_GRAY = RGBColor(100, 116, 139)
HEX_TEAL = "2997AA"
HEX_NAVY = "0F172A"
HEX_LIGHT_BG = "F8FAFC"
HEX_HEADER_BG = "0F172A"
HEX_BORDER = "CBD5E1"

def set_cell_background(cell, hex_color):
    shading_elm = parse_xml(f'<w:shd {nsdecls("w")} w:fill="{hex_color}"/>')
    cell._tc.get_or_add_tcPr().append(shading_elm)

def set_cell_margins(cell, top=100, bottom=100, left=150, right=150):
    tcPr = cell._tc.get_or_add_tcPr()
    tcMar = OxmlElement('w:tcMar')
    for m, val in [('top', top), ('bottom', bottom), ('left', left), ('right', right)]:
        node = OxmlElement(f'w:{m}')
        node.set(qn('w:w'), str(val))
        node.set(qn('w:type'), 'dxa')
        tcMar.append(node)
    tcPr.append(tcMar)

def add_header_textual(doc, title, subtitle):
    table = doc.add_table(rows=1, cols=2)
    table.alignment = WD_TABLE_ALIGNMENT.CENTER
    table.autofit = False
    table.columns[0].width = Inches(2.6)
    table.columns[1].width = Inches(4.3)
    
    cell_left = table.cell(0, 0)
    cell_right = table.cell(0, 1)
    
    for cell in [cell_left, cell_right]:
        tcPr = cell._tc.get_or_add_tcPr()
        tcBorders = parse_xml(f'<w:tcBorders {nsdecls("w")}><w:top w:val="none"/><w:left w:val="none"/><w:bottom w:val="none"/><w:right w:val="none"/></w:tcBorders>')
        tcPr.append(tcBorders)
    
    # Left: Clean textual institutional header (NO LOGO IMAGE)
    p_brand = cell_left.paragraphs[0]
    p_brand.alignment = WD_ALIGN_PARAGRAPH.LEFT
    r_b1 = p_brand.add_run("FULL EQUIPE, S.L.\n")
    r_b1.font.name = 'Arial'
    r_b1.font.size = Pt(11)
    r_b1.font.bold = True
    r_b1.font.color.rgb = COLOR_NAVY
    
    r_b2 = p_brand.add_run("Entidad Organizadora Homologada ante FUNDAE\n")
    r_b2.font.name = 'Arial'
    r_b2.font.size = Pt(7.5)
    r_b2.font.bold = True
    r_b2.font.color.rgb = COLOR_TEAL
    
    r_b3 = p_brand.add_run("CIF: B-85124428")
    r_b3.font.name = 'Arial'
    r_b3.font.size = Pt(7.5)
    r_b3.font.color.rgb = COLOR_GRAY
        
    # Right: Title & Subtitle
    p_title = cell_right.paragraphs[0]
    p_title.alignment = WD_ALIGN_PARAGRAPH.RIGHT
    run_title = p_title.add_run(title.upper() + "\n")
    run_title.font.name = 'Arial'
    run_title.font.size = Pt(12)
    run_title.font.bold = True
    run_title.font.color.rgb = COLOR_NAVY
    
    run_sub = p_title.add_run(subtitle)
    run_sub.font.name = 'Arial'
    run_sub.font.size = Pt(8.5)
    run_sub.font.color.rgb = COLOR_TEAL
    
    p_div = doc.add_paragraph()
    p_div.paragraph_format.space_before = Pt(4)
    p_div.paragraph_format.space_after = Pt(12)
    p_div_border = parse_xml(f'<w:pBdr {nsdecls("w")}><w:bottom w:val="single" w:sz="12" w:space="1" w:color="{HEX_TEAL}"/></w:pBdr>')
    p_div._p.get_or_add_pPr().append(p_div_border)

def style_section_heading(p, text):
    p.paragraph_format.space_before = Pt(12)
    p.paragraph_format.space_after = Pt(5)
    run = p.add_run(text)
    run.font.name = 'Arial'
    run.font.size = Pt(10.5)
    run.font.bold = True
    run.font.color.rgb = COLOR_NAVY

# =========================================================================
# SIGFITO - DOCUMENTOS SIN LOGO
# =========================================================================
def build_sigfito_encomienda(target_paths):
    doc = docx.Document()
    for s in doc.sections:
        s.top_margin = Inches(0.55)
        s.bottom_margin = Inches(0.55)
        s.left_margin = Inches(0.75)
        s.right_margin = Inches(0.75)

    header_tbl = doc.add_table(rows=1, cols=2)
    header_tbl.alignment = WD_TABLE_ALIGNMENT.CENTER
    header_tbl.autofit = False
    header_tbl.columns[0].width = Inches(2.6)
    header_tbl.columns[1].width = Inches(4.3)

    c_logo = header_tbl.cell(0, 0)
    c_text = header_tbl.cell(0, 1)

    for c in [c_logo, c_text]:
        tcPr = c._tc.get_or_add_tcPr()
        borders = parse_xml(f'<w:tcBorders {nsdecls("w")}><w:top w:val="none"/><w:left w:val="none"/><w:bottom w:val="none"/><w:right w:val="none"/></w:tcBorders>')
        tcPr.append(borders)

    # Textual Header (No logo)
    p_logo = c_logo.paragraphs[0]
    p_logo.alignment = WD_ALIGN_PARAGRAPH.LEFT
    r_l1 = p_logo.add_run("FULL EQUIPE, S.L.\n")
    r_l1.font.name = "Arial"
    r_l1.font.size = Pt(12)
    r_l1.font.bold = True
    r_l1.font.color.rgb = COLOR_NAVY
    
    r_l2 = p_logo.add_run("Entidad Organizadora Homologada ante FUNDAE\n")
    r_l2.font.name = "Arial"
    r_l2.font.size = Pt(8)
    r_l2.font.bold = True
    r_l2.font.color.rgb = COLOR_TEAL

    r_l3 = p_logo.add_run("CIF: B-85124428")
    r_l3.font.name = "Arial"
    r_l3.font.size = Pt(7.5)
    r_l3.font.color.rgb = COLOR_GRAY

    p_title = c_text.paragraphs[0]
    p_title.alignment = WD_ALIGN_PARAGRAPH.RIGHT
    r1 = p_title.add_run("DOCUMENTO DE ADHESIÓN\n")
    r1.font.name = "Arial"
    r1.font.size = Pt(12)
    r1.font.bold = True
    r1.font.color.rgb = COLOR_NAVY

    r2 = p_title.add_run("Contrato de Encomienda de Organización de la Formación\n")
    r2.font.name = "Arial"
    r2.font.size = Pt(9)
    r2.font.bold = True
    r2.font.color.rgb = COLOR_TEAL

    r3 = p_title.add_run("Ley 30/2015, de 9 de septiembre · Real Decreto 694/2017")
    r3.font.name = "Arial"
    r3.font.size = Pt(8)
    r3.font.color.rgb = COLOR_GRAY

    p_div = doc.add_paragraph()
    p_div.paragraph_format.space_before = Pt(4)
    p_div.paragraph_format.space_after = Pt(10)
    p_bdr = parse_xml(f'<w:pBdr {nsdecls("w")}><w:bottom w:val="single" w:sz="12" w:space="1" w:color="{HEX_TEAL}"/></w:pBdr>')
    p_div._p.get_or_add_pPr().append(p_bdr)

    p_intro = doc.add_paragraph()
    p_intro.paragraph_format.space_after = Pt(8)
    r_intro = p_intro.add_run(
        "Documento de adhesión al Contrato de Encomienda de Organización de la Formación suscrito entre empresas "
        "al amparo de la Ley 30/2015, de 9 de septiembre, por la que se regula el Sistema de Formación Profesional para el Empleo "
        "en el ámbito laboral, formalizado entre la entidad organizadora acreditada FULL EQUIPE, S.L. y la empresa participante:"
    )
    r_intro.font.name = "Arial"
    r_intro.font.size = Pt(8.5)
    r_intro.font.color.rgb = COLOR_NAVY

    tbl_data = doc.add_table(rows=4, cols=2)
    tbl_data.alignment = WD_TABLE_ALIGNMENT.CENTER
    tbl_data.columns[0].width = Inches(3.45)
    tbl_data.columns[1].width = Inches(3.45)

    fields = [
        ("Nombre y Apellidos del Representante Legal:", "D. Ignacio Dávila Castañeda"),
        ("NIF / NIE del Representante:", "44274413B"),
        ("Razón Social de la Empresa Beneficiaria:", "Sigfito Agroenvases, S.L."),
        ("CIF de la Empresa:", "B83258004"),
        ("Domicilio Social (Calle, Nº, CP, Municipio):", "Bravo Murillo 377, 3º D E, 28020 Madrid"),
        ("Provincia:", "Madrid"),
        ("Código Cuenta de Cotización (CCC Seg. Social):", "28139175691"),
        ("Facultad que ostenta (Administrador / Apoderado):", "Director General")
    ]

    f_idx = 0
    for r in range(4):
        for c in range(2):
            cell = tbl_data.cell(r, c)
            shd = parse_xml(f'<w:shd {nsdecls("w")} w:fill="{HEX_LIGHT_BG}"/>')
            cell._tc.get_or_add_tcPr().append(shd)

            bdr = parse_xml(f'<w:tcBorders {nsdecls("w")}><w:top w:val="single" w:sz="4" w:space="0" w:color="{HEX_BORDER}"/><w:left w:val="single" w:sz="4" w:space="0" w:color="{HEX_BORDER}"/><w:bottom w:val="single" w:sz="4" w:space="0" w:color="{HEX_BORDER}"/><w:right w:val="single" w:sz="4" w:space="0" w:color="{HEX_BORDER}"/></w:tcBorders>')
            cell._tc.get_or_add_tcPr().append(bdr)

            tcMar = OxmlElement('w:tcMar')
            for m, val in [('top', 60), ('bottom', 60), ('left', 100), ('right', 100)]:
                n = OxmlElement(f'w:{m}')
                n.set(qn('w:w'), str(val))
                n.set(qn('w:type'), 'dxa')
                tcMar.append(n)
            cell._tc.get_or_add_tcPr().append(tcMar)

            p = cell.paragraphs[0]
            lbl, val = fields[f_idx]
            run_lbl = p.add_run(lbl + "\n")
            run_lbl.font.name = "Arial"
            run_lbl.font.size = Pt(7.5)
            run_lbl.font.bold = True
            run_lbl.font.color.rgb = COLOR_NAVY

            run_val = p.add_run(val)
            run_val.font.name = "Arial"
            run_val.font.size = Pt(8.5)
            run_val.font.bold = True
            run_val.font.color.rgb = COLOR_NAVY
            f_idx += 1

    p_dec = doc.add_paragraph()
    p_dec.paragraph_format.space_before = Pt(10)
    p_dec.paragraph_format.space_after = Pt(4)
    r_dec = p_dec.add_run("DECLARA Y MANIFIESTA:")
    r_dec.font.name = "Arial"
    r_dec.font.size = Pt(8.5)
    r_dec.font.bold = True
    r_dec.font.color.rgb = COLOR_NAVY

    clauses = [
        ("PRIMERO.", "Que la citada empresa está interesada y formaliza por el presente acto su adhesión al Contrato suscrito con la entidad externa organizadora acreditada FULL EQUIPE, S.L. (con CIF B-85124428), para la organización, gestión y comunicación de la formación programada en dicha empresa al amparo de la Ley 30/2015 y Real Decreto 694/2017."),
        ("SEGUNDO.", "Que conoce y acepta el contenido íntegro de las condiciones, derechos y obligaciones fijadas en la normativa reguladora del Sistema de Formación Profesional para el Empleo en el ámbito laboral y en el referido contrato de encomienda."),
        ("TERCERO.", "Que por el presente documento acepta expresamente las obligaciones derivadas de dicha encomienda, autorizando a la entidad organizadora a la consulta del saldo de crédito formativo anual disponible ante el aplicativo oficial del SEPE / FUNDAE y a la comunicación telemática de las acciones formativas, surtiendo efectos desde el momento de su firma.")
    ]

    for num, txt in clauses:
        p_c = doc.add_paragraph()
        p_c.paragraph_format.left_indent = Inches(0.15)
        p_c.paragraph_format.space_after = Pt(3)
        r_n = p_c.add_run(num + " ")
        r_n.font.name = "Arial"
        r_n.font.size = Pt(7.8)
        r_n.font.bold = True
        r_t = p_c.add_run(txt)
        r_t.font.name = "Arial"
        r_t.font.size = Pt(7.8)
        r_t.font.color.rgb = COLOR_NAVY

    p_date = doc.add_paragraph()
    p_date.paragraph_format.space_before = Pt(8)
    p_date.paragraph_format.space_after = Pt(6)
    r_d = p_date.add_run("En Madrid, a 24 de Septiembre de 2026.")
    r_d.font.name = "Arial"
    r_d.font.size = Pt(8.5)
    r_d.font.bold = True

    tbl_sig = doc.add_table(rows=1, cols=2)
    tbl_sig.alignment = WD_TABLE_ALIGNMENT.CENTER
    tbl_sig.columns[0].width = Inches(3.45)
    tbl_sig.columns[1].width = Inches(3.45)

    c_s1 = tbl_sig.cell(0, 0)
    c_s2 = tbl_sig.cell(0, 1)

    for cell in [c_s1, c_s2]:
        tcPr = cell._tc.get_or_add_tcPr()
        bdr = parse_xml(f'<w:tcBorders {nsdecls("w")}><w:top w:val="single" w:sz="6" w:space="0" w:color="{HEX_BORDER}"/><w:left w:val="single" w:sz="6" w:space="0" w:color="{HEX_BORDER}"/><w:bottom w:val="single" w:sz="6" w:space="0" w:color="{HEX_BORDER}"/><w:right w:val="single" w:sz="6" w:space="0" w:color="{HEX_BORDER}"/></w:tcBorders>')
        tcPr.append(bdr)
        
        tcMar = OxmlElement('w:tcMar')
        for m, val in [('top', 100), ('bottom', 100), ('left', 120), ('right', 120)]:
            n = OxmlElement(f'w:{m}')
            n.set(qn('w:w'), str(val))
            n.set(qn('w:type'), 'dxa')
            tcMar.append(n)
        tcPr.append(tcMar)

    p_s1 = c_s1.paragraphs[0]
    p_s1.add_run("POR LA EMPRESA BENEFICIARIA (CLIENTE)\n").font.size = Pt(8)
    p_s1.runs[0].font.bold = True
    p_s1.add_run("Sigfito Agroenvases, S.L. (CIF B83258004)\nD. Ignacio Dávila Castañeda (Director General)\n\n\n\nFirma del Representante Legal:\n_______________________________________").font.size = Pt(7.5)

    p_s2 = c_s2.paragraphs[0]
    p_s2.add_run("POR LA ENTIDAD ORGANIZADORA ACREDITADA\n").font.size = Pt(8)
    p_s2.runs[0].font.bold = True
    p_s2.add_run("FULL EQUIPE, S.L. (CIF B-85124428)\nEntidad Homologada ante SEPE / FUNDAE\n\n\n\nFirma y Sello de la Entidad:\n_______________________________________").font.size = Pt(7.5)

    p_foot = doc.add_paragraph()
    p_foot.paragraph_format.space_before = Pt(8)
    p_foot.paragraph_format.space_after = Pt(0)
    p_foot.alignment = WD_ALIGN_PARAGRAPH.CENTER
    r_foot = p_foot.add_run("FULL EQUIPE, S.L. · Entidad Organizadora Homologada ante el SEPE y FUNDAE (CIF B-85124428)")
    r_foot.font.name = "Arial"
    r_foot.font.size = Pt(7)
    r_foot.font.italic = True
    r_foot.font.color.rgb = COLOR_GRAY

    for out_docx in target_paths:
        os.makedirs(os.path.dirname(out_docx), exist_ok=True)
        doc.save(out_docx)
        print("Created:", out_docx)
        try:
            convert(out_docx)
            print("Converted PDF:", out_docx.replace(".docx", ".pdf"))
        except Exception as e:
            pass

def build_sigfito_ficha_tecnica(target_paths):
    doc = docx.Document()
    for s in doc.sections:
        s.top_margin = Inches(0.8)
        s.bottom_margin = Inches(0.8)
        s.left_margin = Inches(0.8)
        s.right_margin = Inches(0.8)
        
    add_header_textual(
        doc,
        "Ficha Técnica de Acción Formativa",
        "Formación Programada para Empresas · Bonificación FUNDAE"
    )
    
    style_section_heading(doc.add_paragraph(), "1. DATOS DE LA EMPRESA BENEFICIARIA (CLIENTE)")
    t_emp = doc.add_table(rows=3, cols=2)
    t_emp.alignment = WD_TABLE_ALIGNMENT.CENTER
    t_emp.columns[0].width = Inches(3.2)
    t_emp.columns[1].width = Inches(3.5)
    
    fields_emp = [
        ("Razón Social:", "SIGFITO Agroenvases, S.L."),
        ("CIF / NIF:", "B83258004"),
        ("Persona de Contacto / RRHH:", "Esther González"),
        ("Email / Teléfono de Contacto:", "egonzalez@sigfito.es / 668 52 16 05"),
        ("Dirección del Centro de Trabajo:", "C/ Bravo Murillo Nº377, 3º D E, 28020 Madrid"),
        ("Cuenta Cotización Seg. Social (CCC):", "28139175691")
    ]
    
    idx = 0
    for r in range(3):
        for c in range(2):
            cell = t_emp.cell(r, c)
            set_cell_background(cell, HEX_LIGHT_BG if r % 2 == 0 else "FFFFFF")
            set_cell_margins(cell, top=100, bottom=100, left=120, right=120)
            p = cell.paragraphs[0]
            label, val = fields_emp[idx]
            run_lbl = p.add_run(f"{label} ")
            run_lbl.font.bold = True
            run_lbl.font.size = Pt(9.5)
            run_lbl.font.name = 'Arial'
            run_val = p.add_run(val)
            run_val.font.size = Pt(9.5)
            run_val.font.name = 'Arial'
            idx += 1
            
    style_section_heading(doc.add_paragraph(), "2. PLANIFICACIÓN DE LA ACCIÓN FORMATIVA")
    t_curso = doc.add_table(rows=4, cols=2)
    t_curso.alignment = WD_TABLE_ALIGNMENT.CENTER
    t_curso.columns[0].width = Inches(3.2)
    t_curso.columns[1].width = Inches(3.5)
    
    fields_curso = [
        ("Denominación del Curso:", "Microsoft Teams - Fundamentos"),
        ("Nº de Horas y Modalidad:", "4 Horas · Mixta (Presencial + Online)"),
        ("Nº de Participantes Previstos:", "6 alumnos"),
        ("Nº Acción / Grupo FUNDAE:", "[A determinar tras comunicación oficial]"),
        ("Fechas de Impartición:", "13 y 20 de Noviembre de 2026"),
        ("Horario de las Sesiones:", "Viernes de 10:00 a 12:00 h"),
        ("Lugar / Enlace Aula Virtual:", "Oficinas SIGFITO / Microsoft Teams"),
        ("Nivel y Perfil Requerido:", "Fundamentos / Iniciación")
    ]
    
    idx = 0
    for r in range(4):
        for c in range(2):
            cell = t_curso.cell(r, c)
            set_cell_background(cell, HEX_LIGHT_BG if r % 2 == 0 else "FFFFFF")
            set_cell_margins(cell, top=100, bottom=100, left=120, right=120)
            p = cell.paragraphs[0]
            label, val = fields_curso[idx]
            run_lbl = p.add_run(f"{label} ")
            run_lbl.font.bold = True
            run_lbl.font.size = Pt(9.5)
            run_lbl.font.name = 'Arial'
            run_val = p.add_run(val)
            run_val.font.size = Pt(9.5)
            run_val.font.name = 'Arial'
            idx += 1

    style_section_heading(doc.add_paragraph(), "3. EQUIPO DOCENTE Y MARCO ADMINISTRATIVO FUNDAE")
    t_doc = doc.add_table(rows=2, cols=2)
    t_doc.alignment = WD_TABLE_ALIGNMENT.CENTER
    t_doc.columns[0].width = Inches(3.2)
    t_doc.columns[1].width = Inches(3.5)
    
    fields_doc = [
        ("Formadora Asignada:", "Rosa de Mora (Docente Especializada)"),
        ("Contacto Coordinación:", "tblazquez@serviciosmecos.com · 609 269 480"),
        ("Entidad Organizadora Homologada:", "Full Equipe S.L. (Entidad Acreditada FUNDAE - CIF B-85124428)"),
        ("Gestión y Notificación Oficial:", "Tramitación completa ante aplicativo oficial SEPE/FUNDAE")
    ]
    
    idx = 0
    for r in range(2):
        for c in range(2):
            cell = t_doc.cell(r, c)
            set_cell_background(cell, "F0F9FF")
            set_cell_margins(cell, top=100, bottom=100, left=120, right=120)
            p = cell.paragraphs[0]
            label, val = fields_doc[idx]
            run_lbl = p.add_run(f"{label} ")
            run_lbl.font.bold = True
            run_lbl.font.size = Pt(9.5)
            run_lbl.font.name = 'Arial'
            run_val = p.add_run(val)
            run_val.font.size = Pt(9.5)
            run_val.font.name = 'Arial'
            idx += 1

    style_section_heading(doc.add_paragraph(), "4. OBJETIVOS FORMATIVOS")
    p_obj = doc.add_paragraph()
    p_obj.paragraph_format.left_indent = Inches(0.2)
    p_obj.paragraph_format.space_after = Pt(8)
    run_obj = p_obj.add_run("• Introducir a los participantes en el uso práctico y fluido de Microsoft Teams desde cero.\n"
                            "• Dominar el entorno de trabajo, los ajustes iniciales y la gestión eficiente de notificaciones.\n"
                            "• Adquirir soltura en chats individuales y grupales, menciones y compartición de archivos.\n"
                            "• Estructurar equipos y canales de trabajo colaborativo.\n"
                            "• Gestionar y moderar reuniones y videollamadas híbridas (presencial + online) con éxito.")
    run_obj.font.name = 'Arial'
    run_obj.font.size = Pt(9.5)

    style_section_heading(doc.add_paragraph(), "5. PROGRAMA FORMATIVO Y MÓDULOS")
    p_mod = doc.add_paragraph()
    p_mod.paragraph_format.left_indent = Inches(0.2)
    p_mod.paragraph_format.space_after = Pt(12)
    run_mod = p_mod.add_run("Módulo 1: Introducción a Microsoft Teams y funcionalidades clave.\n"
                            "Módulo 2: Conociendo el entorno de Teams (interfaz, actividad, chat, equipos, calendario).\n"
                            "Módulo 3: Chats y comunicación ágil en Teams (herramientas, menciones, anclar y organizar).\n"
                            "Módulo 4: Equipos y canales (creación, canales estándar y privados, archivos).\n"
                            "Módulo 5: Reuniones y videollamadas (convocatoria, configuración de dispositivos, presentación y grabaciones).")
    run_mod.font.name = 'Arial'
    run_mod.font.size = Pt(9.5)
    
    p_foot = doc.add_paragraph()
    p_foot.paragraph_format.space_before = Pt(20)
    run_foot = p_foot.add_run("FULL EQUIPE, S.L. · Entidad Organizadora Homologada ante el SEPE y FUNDAE (CIF B-85124428).")
    run_foot.font.name = 'Arial'
    run_foot.font.size = Pt(8)
    run_foot.font.italic = True
    run_foot.font.color.rgb = COLOR_GRAY

    for out_docx in target_paths:
        os.makedirs(os.path.dirname(out_docx), exist_ok=True)
        doc.save(out_docx)
        print("Created:", out_docx)
        try:
            convert(out_docx)
            print("Converted PDF:", out_docx.replace(".docx", ".pdf"))
        except Exception as e:
            pass

def build_sigfito_excel(target_paths):
    wb = openpyxl.Workbook()
    ws = wb.active
    ws.title = "Datos Bonificación FUNDAE"
    ws.views.sheetView[0].showGridLines = True
    
    font_main_title = Font(name="Segoe UI", size=15, bold=True, color="0F172A")
    font_sub_title = Font(name="Segoe UI", size=10, italic=True, color="2997AA")
    font_sec_header = Font(name="Segoe UI", size=11, bold=True, color="FFFFFF")
    font_tbl_header = Font(name="Segoe UI", size=9, bold=True, color="FFFFFF")
    font_data = Font(name="Segoe UI", size=9.5)
    font_bold = Font(name="Segoe UI", size=9.5, bold=True)
    
    fill_navy = PatternFill(start_color="0F172A", end_color="0F172A", fill_type="solid")
    fill_teal = PatternFill(start_color="2997AA", end_color="2997AA", fill_type="solid")
    fill_light = PatternFill(start_color="F8FAFC", end_color="F8FAFC", fill_type="solid")
    
    border_thin = Border(
        left=Side(style='thin', color="CBD5E1"),
        right=Side(style='thin', color="CBD5E1"),
        top=Side(style='thin', color="CBD5E1"),
        bottom=Side(style='thin', color="CBD5E1")
    )
    
    ws['B2'] = "DATOS NECESARIOS PARA LA BONIFICACIÓN ANTE FUNDAE"
    ws['B2'].font = font_main_title
    ws['B3'] = "Entidad Organizadora Homologada ante FUNDAE: Full Equipe, S.L. (CIF B-85124428)"
    ws['B3'].font = font_sub_title
    
    ws.merge_cells('B5:E5')
    ws['B5'] = "1. DATOS DE LA EMPRESA BENEFICIARIA (CLIENTE)"
    ws['B5'].font = font_sec_header
    ws['B5'].fill = fill_teal
    ws['B5'].alignment = Alignment(horizontal="left", vertical="center", indent=1)
    
    emp_fields = [
        ("Razón Social:", "Sigfito Agroenvases, S.L.", "CIF / NIF:", "B83258004"),
        ("Dirección Completa:", "C/ Bravo Murillo Nº377, 3º D E", "Código Postal y Población:", "28020, Madrid"),
        ("Teléfono de Contacto:", "668 52 16 05", "Email de Contacto RRHH:", "egonzalez@sigfito.es"),
        ("Convenio Colectivo:", "Industria Química", "Código CNAE (4 dígitos):", "7499"),
        ("¿Dispone de RLT / Comité de Empresa?:", "NO", "Cuenta Cotización Principal (CCC):", "28139175691")
    ]
    
    curr_row = 6
    for f1, v1, f2, v2 in emp_fields:
        ws.cell(curr_row, 2, f1).font = font_bold
        ws.cell(curr_row, 2).fill = fill_light
        ws.cell(curr_row, 3, v1).font = font_data
        ws.cell(curr_row, 4, f2).font = font_bold
        ws.cell(curr_row, 4).fill = fill_light
        ws.cell(curr_row, 5, v2).font = font_data
        
        for c in range(2, 6):
            ws.cell(curr_row, c).border = border_thin
            ws.cell(curr_row, c).alignment = Alignment(vertical="center")
        curr_row += 1

    curr_row += 2
    ws.merge_cells(f'B{curr_row}:M{curr_row}')
    ws[f'B{curr_row}'] = "2. DATOS DE LOS PARTICIPANTES A BONIFICAR (TRABAJADORES POR CUENTA AJENA - 6 ALUMNOS)"
    ws[f'B{curr_row}'].font = font_sec_header
    ws[f'B{curr_row}'].fill = fill_navy
    ws[f'B{curr_row}'].alignment = Alignment(horizontal="left", vertical="center", indent=1)
    
    curr_row += 1
    headers_part = [
        "Nº", "Primer Apellido", "Segundo Apellido", "Nombre", "NIF / NIE", 
        "Teléfono", "Email de Trabajo", "Nº Seg. Social (NASS)", "Fecha Nacimiento", 
        "Categoría Profesional", "Grupo Cotización (1-11)", "Cuenta Cotiz. CCC", "Nivel de Estudios"
    ]
    
    for c_idx, h_text in enumerate(headers_part, start=2):
        cell = ws.cell(curr_row, c_idx, h_text)
        cell.font = font_tbl_header
        cell.fill = fill_teal
        cell.alignment = Alignment(horizontal="center", vertical="center", wrap_text=True)
        cell.border = border_thin
        
    for r_idx in range(1, 10):
        curr_row += 1
        num_cell = ws.cell(curr_row, 2, r_idx)
        num_cell.font = font_bold
        num_cell.alignment = Alignment(horizontal="center", vertical="center")
        num_cell.border = border_thin
        if r_idx % 2 == 0:
            num_cell.fill = fill_light
            
        for c_idx in range(3, len(headers_part) + 2):
            cell = ws.cell(curr_row, c_idx, "")
            cell.border = border_thin
            cell.font = font_data
            if r_idx % 2 == 0:
                cell.fill = fill_light
                
    col_widths = {
        'A': 4, 'B': 6, 'C': 18, 'D': 18, 'E': 16, 'F': 13, 
        'G': 14, 'H': 24, 'I': 20, 'J': 16, 'K': 22, 'L': 18, 'M': 20
    }
    for col, width in col_widths.items():
        ws.column_dimensions[col].width = width

    for out_path in target_paths:
        os.makedirs(os.path.dirname(out_path), exist_ok=True)
        wb.save(out_path)
        print("Created:", out_path)

# =========================================================================
# PLANTILLAS MAESTRAS - SIN LOGO
# =========================================================================
def build_plantilla_encomienda(target_paths):
    doc = docx.Document()
    for s in doc.sections:
        s.top_margin = Inches(0.55)
        s.bottom_margin = Inches(0.55)
        s.left_margin = Inches(0.75)
        s.right_margin = Inches(0.75)

    header_tbl = doc.add_table(rows=1, cols=2)
    header_tbl.alignment = WD_TABLE_ALIGNMENT.CENTER
    header_tbl.autofit = False
    header_tbl.columns[0].width = Inches(2.6)
    header_tbl.columns[1].width = Inches(4.3)

    c_logo = header_tbl.cell(0, 0)
    c_text = header_tbl.cell(0, 1)

    for c in [c_logo, c_text]:
        tcPr = c._tc.get_or_add_tcPr()
        borders = parse_xml(f'<w:tcBorders {nsdecls("w")}><w:top w:val="none"/><w:left w:val="none"/><w:bottom w:val="none"/><w:right w:val="none"/></w:tcBorders>')
        tcPr.append(borders)

    p_logo = c_logo.paragraphs[0]
    p_logo.alignment = WD_ALIGN_PARAGRAPH.LEFT
    r_l1 = p_logo.add_run("FULL EQUIPE, S.L.\n")
    r_l1.font.name = "Arial"
    r_l1.font.size = Pt(12)
    r_l1.font.bold = True
    r_l1.font.color.rgb = COLOR_NAVY
    
    r_l2 = p_logo.add_run("Entidad Organizadora Homologada ante FUNDAE\n")
    r_l2.font.name = "Arial"
    r_l2.font.size = Pt(8)
    r_l2.font.bold = True
    r_l2.font.color.rgb = COLOR_TEAL

    r_l3 = p_logo.add_run("CIF: B-85124428")
    r_l3.font.name = "Arial"
    r_l3.font.size = Pt(7.5)
    r_l3.font.color.rgb = COLOR_GRAY

    p_title = c_text.paragraphs[0]
    p_title.alignment = WD_ALIGN_PARAGRAPH.RIGHT
    r1 = p_title.add_run("DOCUMENTO DE ADHESIÓN\n")
    r1.font.name = "Arial"
    r1.font.size = Pt(12)
    r1.font.bold = True
    r1.font.color.rgb = COLOR_NAVY

    r2 = p_title.add_run("Contrato de Encomienda de Organización de la Formación\n")
    r2.font.name = "Arial"
    r2.font.size = Pt(9)
    r2.font.bold = True
    r2.font.color.rgb = COLOR_TEAL

    r3 = p_title.add_run("Ley 30/2015, de 9 de septiembre · Real Decreto 694/2017")
    r3.font.name = "Arial"
    r3.font.size = Pt(8)
    r3.font.color.rgb = COLOR_GRAY

    p_div = doc.add_paragraph()
    p_div.paragraph_format.space_before = Pt(4)
    p_div.paragraph_format.space_after = Pt(10)
    p_bdr = parse_xml(f'<w:pBdr {nsdecls("w")}><w:bottom w:val="single" w:sz="12" w:space="1" w:color="{HEX_TEAL}"/></w:pBdr>')
    p_div._p.get_or_add_pPr().append(p_bdr)

    p_intro = doc.add_paragraph()
    p_intro.paragraph_format.space_after = Pt(8)
    r_intro = p_intro.add_run(
        "Documento de adhesión al Contrato de Encomienda de Organización de la Formación suscrito entre empresas "
        "al amparo de la Ley 30/2015, de 9 de septiembre, por la que se regula el Sistema de Formación Profesional para el Empleo "
        "en el ámbito laboral, formalizado entre la entidad organizadora acreditada FULL EQUIPE, S.L. y la empresa participante:"
    )
    r_intro.font.name = "Arial"
    r_intro.font.size = Pt(8.5)
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

    p_dec = doc.add_paragraph()
    p_dec.paragraph_format.space_before = Pt(10)
    p_dec.paragraph_format.space_after = Pt(4)
    r_dec = p_dec.add_run("DECLARA Y MANIFIESTA:")
    r_dec.font.name = "Arial"
    r_dec.font.size = Pt(8.5)
    r_dec.font.bold = True
    r_dec.font.color.rgb = COLOR_NAVY

    clauses = [
        ("PRIMERO.", "Que la citada empresa está interesada y formaliza por el presente acto su adhesión al Contrato suscrito con la entidad externa organizadora acreditada FULL EQUIPE, S.L. (con CIF B-85124428), para la organización, gestión y comunicación de la formación programada en dicha empresa al amparo de la Ley 30/2015 y Real Decreto 694/2017."),
        ("SEGUNDO.", "Que conoce y acepta el contenido íntegro de las condiciones, derechos y obligaciones fijadas en la normativa reguladora del Sistema de Formación Profesional para el Empleo en el ámbito laboral y en el referido contrato de encomienda."),
        ("TERCERO.", "Que por el presente documento acepta expresamente las obligaciones derivadas de dicha encomienda, autorizando a la entidad organizadora a la consulta del saldo de crédito formativo anual disponible ante el aplicativo oficial del SEPE / FUNDAE y a la comunicación telemática de las acciones formativas, surtiendo efectos desde el momento de su firma.")
    ]

    for num, txt in clauses:
        p_c = doc.add_paragraph()
        p_c.paragraph_format.left_indent = Inches(0.15)
        p_c.paragraph_format.space_after = Pt(3)
        r_n = p_c.add_run(num + " ")
        r_n.font.name = "Arial"
        r_n.font.size = Pt(7.8)
        r_n.font.bold = True
        r_t = p_c.add_run(txt)
        r_t.font.name = "Arial"
        r_t.font.size = Pt(7.8)
        r_t.font.color.rgb = COLOR_NAVY

    p_date = doc.add_paragraph()
    p_date.paragraph_format.space_before = Pt(8)
    p_date.paragraph_format.space_after = Pt(6)
    r_d = p_date.add_run("En _____________________________, a ______ de ___________________ de 2026.")
    r_d.font.name = "Arial"
    r_d.font.size = Pt(8.5)
    r_d.font.bold = True

    tbl_sig = doc.add_table(rows=1, cols=2)
    tbl_sig.alignment = WD_TABLE_ALIGNMENT.CENTER
    tbl_sig.columns[0].width = Inches(3.45)
    tbl_sig.columns[1].width = Inches(3.45)

    c_s1 = tbl_sig.cell(0, 0)
    c_s2 = tbl_sig.cell(0, 1)

    for cell in [c_s1, c_s2]:
        tcPr = cell._tc.get_or_add_tcPr()
        bdr = parse_xml(f'<w:tcBorders {nsdecls("w")}><w:top w:val="single" w:sz="6" w:space="0" w:color="{HEX_BORDER}"/><w:left w:val="single" w:sz="6" w:space="0" w:color="{HEX_BORDER}"/><w:bottom w:val="single" w:sz="6" w:space="0" w:color="{HEX_BORDER}"/><w:right w:val="single" w:sz="6" w:space="0" w:color="{HEX_BORDER}"/></w:tcBorders>')
        tcPr.append(bdr)
        
        tcMar = OxmlElement('w:tcMar')
        for m, val in [('top', 100), ('bottom', 100), ('left', 120), ('right', 120)]:
            n = OxmlElement(f'w:{m}')
            n.set(qn('w:w'), str(val))
            n.set(qn('w:type'), 'dxa')
            tcMar.append(n)
        tcPr.append(tcMar)

    p_s1 = c_s1.paragraphs[0]
    p_s1.add_run("POR LA EMPRESA BENEFICIARIA (CLIENTE)\n").font.size = Pt(8)
    p_s1.runs[0].font.bold = True
    p_s1.add_run("(Representante Legal / Apoderado)\n\n\n\n\nFirma y Sello de la Empresa:\n_______________________________________").font.size = Pt(7.5)

    p_s2 = c_s2.paragraphs[0]
    p_s2.add_run("POR LA ENTIDAD ORGANIZADORA ACREDITADA\n").font.size = Pt(8)
    p_s2.runs[0].font.bold = True
    p_s2.add_run("FULL EQUIPE, S.L. (CIF B-85124428)\n\n\n\n\nFirma y Sello de la Entidad:\n_______________________________________").font.size = Pt(7.5)

    p_foot = doc.add_paragraph()
    p_foot.paragraph_format.space_before = Pt(8)
    p_foot.paragraph_format.space_after = Pt(0)
    p_foot.alignment = WD_ALIGN_PARAGRAPH.CENTER
    r_foot = p_foot.add_run("FULL EQUIPE, S.L. · Entidad Organizadora Homologada ante el SEPE y FUNDAE (CIF B-85124428)")
    r_foot.font.name = "Arial"
    r_foot.font.size = Pt(7)
    r_foot.font.italic = True
    r_foot.font.color.rgb = COLOR_GRAY

    for out_docx in target_paths:
        os.makedirs(os.path.dirname(out_docx), exist_ok=True)
        doc.save(out_docx)
        print("Created:", out_docx)
        try:
            convert(out_docx)
            print("Converted PDF:", out_docx.replace(".docx", ".pdf"))
        except Exception as e:
            pass

def build_plantilla_ficha_tecnica(target_paths):
    doc = docx.Document()
    for s in doc.sections:
        s.top_margin = Inches(0.8)
        s.bottom_margin = Inches(0.8)
        s.left_margin = Inches(0.8)
        s.right_margin = Inches(0.8)
        
    add_header_textual(
        doc,
        "Ficha Técnica de Acción Formativa",
        "Formación Programada para Empresas · Bonificación FUNDAE"
    )
    
    style_section_heading(doc.add_paragraph(), "1. DATOS DE LA EMPRESA BENEFICIARIA (CLIENTE)")
    t_emp = doc.add_table(rows=3, cols=2)
    t_emp.alignment = WD_TABLE_ALIGNMENT.CENTER
    t_emp.columns[0].width = Inches(3.2)
    t_emp.columns[1].width = Inches(3.5)
    
    fields_emp = [
        ("Razón Social:", "[Nombre de la empresa cliente]"),
        ("CIF / NIF:", "[B12345678]"),
        ("Persona de Contacto / RRHH:", "[Nombre y Cargo del Responsable]"),
        ("Email / Teléfono de Contacto:", "[email@empresa.com / 600 000 000]"),
        ("Dirección del Centro de Trabajo:", "[Calle, Nº, Código Postal, Ciudad]"),
        ("Cuenta Cotización Seg. Social (CCC):", "[28/123456789/00]")
    ]
    
    idx = 0
    for r in range(3):
        for c in range(2):
            cell = t_emp.cell(r, c)
            set_cell_background(cell, HEX_LIGHT_BG if r % 2 == 0 else "FFFFFF")
            set_cell_margins(cell, top=100, bottom=100, left=120, right=120)
            p = cell.paragraphs[0]
            label, val = fields_emp[idx]
            run_lbl = p.add_run(f"{label} ")
            run_lbl.font.bold = True
            run_lbl.font.size = Pt(9.5)
            run_lbl.font.name = 'Arial'
            run_val = p.add_run(val)
            run_val.font.size = Pt(9.5)
            run_val.font.name = 'Arial'
            run_val.font.color.rgb = COLOR_GRAY
            idx += 1
            
    style_section_heading(doc.add_paragraph(), "2. PLANIFICACIÓN DE LA ACCIÓN FORMATIVA")
    t_curso = doc.add_table(rows=4, cols=2)
    t_curso.alignment = WD_TABLE_ALIGNMENT.CENTER
    t_curso.columns[0].width = Inches(3.2)
    t_curso.columns[1].width = Inches(3.5)
    
    fields_curso = [
        ("Denominación del Curso:", "[Ej: Inteligencia Artificial y Herramientas Digitales]"),
        ("Nº de Horas y Modalidad:", "[Ej: 15 Horas · Aula Virtual / Presencial]"),
        ("Nº de Participantes Previstos:", "[Ej: 10 alumnos]"),
        ("Nº Acción / Grupo FUNDAE:", "[A determinar tras comunicación oficial]"),
        ("Fechas de Impartición:", "[Ej: Del 10 al 25 de Noviembre de 2026]"),
        ("Horario de las Sesiones:", "[Ej: Martes y Jueves de 10:00 a 12:30h]"),
        ("Lugar / Enlace Aula Virtual:", "[Instalaciones del cliente / Microsoft Teams]"),
        ("Nivel y Perfil Requerido:", "[Iniciación / Intermedio / Avanzado]")
    ]
    
    idx = 0
    for r in range(4):
        for c in range(2):
            cell = t_curso.cell(r, c)
            set_cell_background(cell, HEX_LIGHT_BG if r % 2 == 0 else "FFFFFF")
            set_cell_margins(cell, top=100, bottom=100, left=120, right=120)
            p = cell.paragraphs[0]
            label, val = fields_curso[idx]
            run_lbl = p.add_run(f"{label} ")
            run_lbl.font.bold = True
            run_lbl.font.size = Pt(9.5)
            run_lbl.font.name = 'Arial'
            run_val = p.add_run(val)
            run_val.font.size = Pt(9.5)
            run_val.font.name = 'Arial'
            run_val.font.color.rgb = COLOR_GRAY
            idx += 1

    style_section_heading(doc.add_paragraph(), "3. EQUIPO DOCENTE Y MARCO ADMINISTRATIVO FUNDAE")
    t_doc = doc.add_table(rows=2, cols=2)
    t_doc.alignment = WD_TABLE_ALIGNMENT.CENTER
    t_doc.columns[0].width = Inches(3.2)
    t_doc.columns[1].width = Inches(3.5)
    
    fields_doc = [
        ("Formador / Equipo Docente:", "[Nombre del Formador Asignado]"),
        ("Email / Teléfono Formador:", "[Contacto del Formador / Coordinación]"),
        ("Entidad Organizadora Homologada:", "Full Equipe S.L. (Entidad Acreditada FUNDAE - CIF B-85124428)"),
        ("Gestión y Notificación Oficial:", "Tramitación completa ante aplicativo oficial SEPE/FUNDAE")
    ]
    
    idx = 0
    for r in range(2):
        for c in range(2):
            cell = t_doc.cell(r, c)
            set_cell_background(cell, "F0F9FF")
            set_cell_margins(cell, top=100, bottom=100, left=120, right=120)
            p = cell.paragraphs[0]
            label, val = fields_doc[idx]
            run_lbl = p.add_run(f"{label} ")
            run_lbl.font.bold = True
            run_lbl.font.size = Pt(9.5)
            run_lbl.font.name = 'Arial'
            run_val = p.add_run(val)
            run_val.font.size = Pt(9.5)
            run_val.font.name = 'Arial'
            idx += 1

    style_section_heading(doc.add_paragraph(), "4. OBJETIVOS FORMATIVOS")
    p_obj = doc.add_paragraph()
    p_obj.paragraph_format.left_indent = Inches(0.2)
    p_obj.paragraph_format.space_after = Pt(8)
    run_obj = p_obj.add_run("• Capacitar a los profesionales en el uso eficiente y seguro de las herramientas digitales.\n"
                            "• Aplicar automatizaciones y flujos de trabajo orientados a la productividad del día a día.\n"
                            "• Desarrollar casos prácticos y proyectos adaptados al sector y operativa del cliente.\n"
                            "• Adquirir criterios de análisis crítico, verificación de calidad y buenas prácticas.")
    run_obj.font.name = 'Arial'
    run_obj.font.size = Pt(9.5)

    style_section_heading(doc.add_paragraph(), "5. PROGRAMA FORMATIVO Y MÓDULOS")
    p_mod = doc.add_paragraph()
    p_mod.paragraph_format.left_indent = Inches(0.2)
    p_mod.paragraph_format.space_after = Pt(12)
    run_mod = p_mod.add_run("Módulo 1: Fundamentos, conceptos clave y configuración del entorno de trabajo.\n"
                            "Módulo 2: Técnicas esenciales, funciones avanzadas y metodología práctica.\n"
                            "Módulo 3: Automatización de tareas repetitivas y casos de uso del equipo.\n"
                            "Módulo 4: Proyecto aplicado a la empresa, resolución de dudas y plan de mejora continua.")
    run_mod.font.name = 'Arial'
    run_mod.font.size = Pt(9.5)
    
    p_foot = doc.add_paragraph()
    p_foot.paragraph_format.space_before = Pt(20)
    run_foot = p_foot.add_run("FULL EQUIPE, S.L. · Entidad Organizadora Homologada ante el SEPE y FUNDAE (CIF B-85124428).")
    run_foot.font.name = 'Arial'
    run_foot.font.size = Pt(8)
    run_foot.font.italic = True
    run_foot.font.color.rgb = COLOR_GRAY

    for out_docx in target_paths:
        os.makedirs(os.path.dirname(out_docx), exist_ok=True)
        doc.save(out_docx)
        print("Created:", out_docx)
        try:
            convert(out_docx)
            print("Converted PDF:", out_docx.replace(".docx", ".pdf"))
        except Exception as e:
            pass

def build_plantilla_recibi(target_paths):
    doc = docx.Document()
    for s in doc.sections:
        s.top_margin = Inches(0.8)
        s.bottom_margin = Inches(0.8)
        s.left_margin = Inches(0.8)
        s.right_margin = Inches(0.8)
        
    add_header_textual(
        doc,
        "Entrega y Recibí de Material Didáctico",
        "Justificante de Entrega · Formación Bonificada FUNDAE"
    )
    
    p_intro = doc.add_paragraph()
    p_intro.paragraph_format.space_after = Pt(14)
    run_intro = p_intro.add_run("En cumplimiento de lo dispuesto en la normativa reguladora del Sistema de Formación Profesional para el Empleo (Ley 30/2015 y Orden TAS/2307/2007), se expide el presente documento que acredita la entrega de los medios didácticos y recursos formativos a los participantes de la acción formativa.")
    run_intro.font.name = 'Arial'
    run_intro.font.size = Pt(9.5)
    run_intro.font.color.rgb = COLOR_NAVY

    t = doc.add_table(rows=5, cols=2)
    t.alignment = WD_TABLE_ALIGNMENT.CENTER
    t.columns[0].width = Inches(2.5)
    t.columns[1].width = Inches(4.2)
    
    fields = [
        ("Nombre de la Acción Formativa:", "[Nombre del Curso]"),
        ("Nº Acción / Nº Grupo FUNDAE:", "[Acción ___ / Grupo ___]"),
        ("Empresa Participante:", "[Razón Social de la Empresa]"),
        ("Nombre y Apellidos del Alumno/a:", "[Nombre y Apellidos del Participante]"),
        ("DNI / NIE del Alumno/a:", "[12345678X]")
    ]
    
    for r in range(5):
        cell_lbl = t.cell(r, 0)
        cell_val = t.cell(r, 1)
        set_cell_background(cell_lbl, HEX_LIGHT_BG)
        set_cell_margins(cell_lbl, top=120, bottom=120, left=120, right=120)
        set_cell_margins(cell_val, top=120, bottom=120, left=120, right=120)
        
        lbl_text, val_text = fields[r]
        p_l = cell_lbl.paragraphs[0]
        run_l = p_l.add_run(lbl_text)
        run_l.font.name = 'Arial'
        run_l.font.size = Pt(9.5)
        run_l.font.bold = True
        
        p_v = cell_val.paragraphs[0]
        run_v = p_v.add_run(val_text)
        run_v.font.name = 'Arial'
        run_v.font.size = Pt(9.5)

    style_section_heading(doc.add_paragraph(), "DECLARACIÓN DE RECEPCIÓN")
    p_dec = doc.add_paragraph()
    p_dec.paragraph_format.space_after = Pt(16)
    run_dec = p_dec.add_run("Declaro por la presente haber recibido de forma íntegra y gratuita, con anterioridad o al inicio del curso, el material didáctico oficial y los recursos formativos necesarios para el correcto seguimiento de la formación, incluyendo:")
    run_dec.font.name = 'Arial'
    run_dec.font.size = Pt(9.5)
    
    p_bullets = doc.add_paragraph()
    p_bullets.paragraph_format.left_indent = Inches(0.2)
    p_bullets.paragraph_format.space_after = Pt(24)
    run_b = p_bullets.add_run("✔ Manual / Guía didáctica digital del curso con contenidos teóricos y ejercicios paso a paso.\n"
                              "✔ Hojas de cálculo, plantillas y archivos de datos para la realización de las prácticas.\n"
                              "✔ Acceso a la plataforma y herramientas tecnológicas requeridas para la impartición.\n"
                              "✔ Material de consulta de referencia, atajos y enlaces a recursos complementarios.")
    run_b.font.name = 'Arial'
    run_b.font.size = Pt(9.5)

    t_sig = doc.add_table(rows=1, cols=2)
    t_sig.alignment = WD_TABLE_ALIGNMENT.CENTER
    t_sig.columns[0].width = Inches(3.3)
    t_sig.columns[1].width = Inches(3.4)
    
    c1 = t_sig.cell(0, 0)
    c2 = t_sig.cell(0, 1)
    for c in [c1, c2]:
        set_cell_margins(c, top=140, bottom=140, left=120, right=120)
        tcPr = c._tc.get_or_add_tcPr()
        tcBorders = parse_xml(f'<w:tcBorders {nsdecls("w")}><w:top w:val="single" w:sz="6" w:space="0" w:color="{HEX_BORDER}"/><w:left w:val="single" w:sz="6" w:space="0" w:color="{HEX_BORDER}"/><w:bottom w:val="single" w:sz="6" w:space="0" w:color="{HEX_BORDER}"/><w:right w:val="single" w:sz="6" w:space="0" w:color="{HEX_BORDER}"/></w:tcBorders>')
        tcPr.append(tcBorders)
    
    p1 = c1.paragraphs[0]
    p1.add_run("Fecha de Entrega: _____ / _____ / 2026\n\nFirma del/la Alumno/a:\n\n\n\n____________________________________").font.size = Pt(9)
    
    p2 = c2.paragraphs[0]
    p2.add_run("Entidad Organizadora Acreditada ante FUNDAE:\nFULL EQUIPE, S.L. (CIF B-85124428)\n\nFirma del Formador / Responsable:\n\n\n____________________________________").font.size = Pt(9)

    for out_docx in target_paths:
        os.makedirs(os.path.dirname(out_docx), exist_ok=True)
        doc.save(out_docx)
        print("Created:", out_docx)
        try:
            convert(out_docx)
            print("Converted PDF:", out_docx.replace(".docx", ".pdf"))
        except Exception as e:
            pass

def build_plantilla_asistencia(target_paths):
    doc = docx.Document()
    for s in doc.sections:
        s.orientation = docx.enum.section.WD_ORIENT.LANDSCAPE
        s.page_width = Inches(11.69)
        s.page_height = Inches(8.27)
        s.top_margin = Inches(0.7)
        s.bottom_margin = Inches(0.7)
        s.left_margin = Inches(0.7)
        s.right_margin = Inches(0.7)
        
    add_header_textual(
        doc,
        "Control de Asistencia y Parte Diario de Firmas",
        "Formación Programada para Empresas · Requisito Oficial FUNDAE"
    )
    
    t_meta = doc.add_table(rows=2, cols=3)
    t_meta.alignment = WD_TABLE_ALIGNMENT.CENTER
    t_meta.columns[0].width = Inches(3.4)
    t_meta.columns[1].width = Inches(3.4)
    t_meta.columns[2].width = Inches(3.4)
    
    meta_info = [
        ("Curso:", "[Nombre de la Acción Formativa]"),
        ("Empresa Cliente:", "[Razón Social Cliente]"),
        ("Nº Acción / Grupo:", "[Acción ___ / Grupo ___]"),
        ("Fechas y Horario:", "[Días concretos y franja horaria]"),
        ("Formador / Docente:", "[Nombre del Formador Asignado]"),
        ("Entidad Organizadora:", "Full Equipe S.L. (Acreditada FUNDAE - CIF B-85124428)")
    ]
    
    idx = 0
    for r in range(2):
        for c in range(3):
            cell = t_meta.cell(r, c)
            set_cell_background(cell, HEX_LIGHT_BG)
            set_cell_margins(cell, top=80, bottom=80, left=100, right=100)
            p = cell.paragraphs[0]
            lbl, val = meta_info[idx]
            run_l = p.add_run(f"{lbl} ")
            run_l.font.bold = True
            run_l.font.size = Pt(8.5)
            run_l.font.name = 'Arial'
            run_v = p.add_run(val)
            run_v.font.size = Pt(8.5)
            run_v.font.name = 'Arial'
            idx += 1

    doc.add_paragraph().paragraph_format.space_before = Pt(10)
    
    cols_headers = ["Nº", "Apellidos y Nombre del Participante", "NIF / DNI", "Sesión 1\nFecha: ___", "Sesión 2\nFecha: ___", "Sesión 3\nFecha: ___", "Sesión 4\nFecha: ___", "Sesión 5\nFecha: ___", "Total Horas"]
    col_widths = [Inches(0.4), Inches(2.6), Inches(1.1), Inches(1.1), Inches(1.1), Inches(1.1), Inches(1.1), Inches(1.1), Inches(0.7)]
    
    t_att = doc.add_table(rows=11, cols=len(cols_headers))
    t_att.alignment = WD_TABLE_ALIGNMENT.CENTER
    
    for c_idx, h_text in enumerate(cols_headers):
        cell = t_att.cell(0, c_idx)
        cell.width = col_widths[c_idx]
        set_cell_background(cell, HEX_HEADER_BG)
        set_cell_margins(cell, top=80, bottom=80, left=60, right=60)
        p = cell.paragraphs[0]
        p.alignment = WD_ALIGN_PARAGRAPH.CENTER
        run = p.add_run(h_text)
        run.font.bold = True
        run.font.size = Pt(8)
        run.font.name = 'Arial'
        run.font.color.rgb = RGBColor(255, 255, 255)
        
    for r in range(1, 11):
        for c in range(len(cols_headers)):
            cell = t_att.cell(r, c)
            cell.width = col_widths[c]
            set_cell_margins(cell, top=100, bottom=100, left=60, right=60)
            if r % 2 == 0:
                set_cell_background(cell, HEX_LIGHT_BG)
            if c == 0:
                p = cell.paragraphs[0]
                p.alignment = WD_ALIGN_PARAGRAPH.CENTER
                p.add_run(str(r)).font.size = Pt(8)
                
    p_note = doc.add_paragraph()
    p_note.paragraph_format.space_before = Pt(12)
    p_note.add_run("Nota obligatoria FUNDAE: Cada participante debe firmar personalmente en la casilla correspondiente a cada sesión diaria impartida. El formador certifica la asistencia real de los alumnos.").font.size = Pt(8)
    
    for out_docx in target_paths:
        os.makedirs(os.path.dirname(out_docx), exist_ok=True)
        doc.save(out_docx)
        print("Created:", out_docx)
        try:
            convert(out_docx)
            print("Converted PDF:", out_docx.replace(".docx", ".pdf"))
        except Exception as e:
            pass

def build_plantilla_excel(target_paths):
    wb = openpyxl.Workbook()
    ws = wb.active
    ws.title = "Datos Bonificación FUNDAE"
    ws.views.sheetView[0].showGridLines = True
    
    font_main_title = Font(name="Segoe UI", size=15, bold=True, color="0F172A")
    font_sub_title = Font(name="Segoe UI", size=10, italic=True, color="2997AA")
    font_sec_header = Font(name="Segoe UI", size=11, bold=True, color="FFFFFF")
    font_tbl_header = Font(name="Segoe UI", size=9, bold=True, color="FFFFFF")
    font_data = Font(name="Segoe UI", size=9.5)
    font_bold = Font(name="Segoe UI", size=9.5, bold=True)
    
    fill_navy = PatternFill(start_color="0F172A", end_color="0F172A", fill_type="solid")
    fill_teal = PatternFill(start_color="2997AA", end_color="2997AA", fill_type="solid")
    fill_light = PatternFill(start_color="F8FAFC", end_color="F8FAFC", fill_type="solid")
    
    border_thin = Border(
        left=Side(style='thin', color="CBD5E1"),
        right=Side(style='thin', color="CBD5E1"),
        top=Side(style='thin', color="CBD5E1"),
        bottom=Side(style='thin', color="CBD5E1")
    )
    
    ws['B2'] = "DATOS NECESARIOS PARA LA BONIFICACIÓN ANTE FUNDAE"
    ws['B2'].font = font_main_title
    ws['B3'] = "Entidad Organizadora Homologada ante FUNDAE: Full Equipe, S.L. (CIF B-85124428)"
    ws['B3'].font = font_sub_title
    
    ws.merge_cells('B5:E5')
    ws['B5'] = "1. DATOS DE LA EMPRESA BENEFICIARIA (CLIENTE)"
    ws['B5'].font = font_sec_header
    ws['B5'].fill = fill_teal
    ws['B5'].alignment = Alignment(horizontal="left", vertical="center", indent=1)
    
    emp_fields = [
        ("Razón Social:", "", "CIF / NIF:", ""),
        ("Dirección Completa:", "", "Código Postal y Población:", ""),
        ("Teléfono de Contacto:", "", "Email de Contacto RRHH:", ""),
        ("Convenio Colectivo:", "", "Código CNAE (4 dígitos):", ""),
        ("¿Dispone de RLT / Comité de Empresa?:", "No / Sí", "Cuenta Cotización Principal (CCC):", "")
    ]
    
    curr_row = 6
    for f1, v1, f2, v2 in emp_fields:
        ws.cell(curr_row, 2, f1).font = font_bold
        ws.cell(curr_row, 2).fill = fill_light
        ws.cell(curr_row, 3, v1).font = font_data
        ws.cell(curr_row, 4, f2).font = font_bold
        ws.cell(curr_row, 4).fill = fill_light
        ws.cell(curr_row, 5, v2).font = font_data
        
        for c in range(2, 6):
            ws.cell(curr_row, c).border = border_thin
            ws.cell(curr_row, c).alignment = Alignment(vertical="center")
        curr_row += 1

    curr_row += 2
    ws.merge_cells(f'B{curr_row}:M{curr_row}')
    ws[f'B{curr_row}'] = "2. DATOS DE LOS PARTICIPANTES A BONIFICAR (TRABAJADORES POR CUENTA AJENA)"
    ws[f'B{curr_row}'].font = font_sec_header
    ws[f'B{curr_row}'].fill = fill_navy
    ws[f'B{curr_row}'].alignment = Alignment(horizontal="left", vertical="center", indent=1)
    
    curr_row += 1
    headers_part = [
        "Nº", "Primer Apellido", "Segundo Apellido", "Nombre", "NIF / NIE", 
        "Teléfono", "Email de Trabajo", "Nº Seg. Social (NASS)", "Fecha Nacimiento", 
        "Categoría Profesional", "Grupo Cotización (1-11)", "Cuenta Cotiz. CCC", "Nivel de Estudios"
    ]
    
    for c_idx, h_text in enumerate(headers_part, start=2):
        cell = ws.cell(curr_row, c_idx, h_text)
        cell.font = font_tbl_header
        cell.fill = fill_teal
        cell.alignment = Alignment(horizontal="center", vertical="center", wrap_text=True)
        cell.border = border_thin
        
    for r_idx in range(1, 13):
        curr_row += 1
        num_cell = ws.cell(curr_row, 2, r_idx)
        num_cell.font = font_bold
        num_cell.alignment = Alignment(horizontal="center", vertical="center")
        num_cell.border = border_thin
        if r_idx % 2 == 0:
            num_cell.fill = fill_light
            
        for c_idx in range(3, len(headers_part) + 2):
            cell = ws.cell(curr_row, c_idx, "")
            cell.border = border_thin
            cell.font = font_data
            if r_idx % 2 == 0:
                cell.fill = fill_light
                
    col_widths = {
        'A': 4, 'B': 6, 'C': 18, 'D': 18, 'E': 16, 'F': 13, 
        'G': 14, 'H': 24, 'I': 20, 'J': 16, 'K': 22, 'L': 18, 'M': 20
    }
    for col, width in col_widths.items():
        ws.column_dimensions[col].width = width

    for out_path in target_paths:
        os.makedirs(os.path.dirname(out_path), exist_ok=True)
        wb.save(out_path)
        print("Created:", out_path)

def build_plantilla_guia(target_paths):
    doc = docx.Document()
    for s in doc.sections:
        s.top_margin = Inches(0.8)
        s.bottom_margin = Inches(0.8)
        s.left_margin = Inches(0.8)
        s.right_margin = Inches(0.8)
        
    add_header_textual(
        doc,
        "Instrucciones: Adhesión a la Encomienda",
        "Autorización de Consulta de Crédito y Gestión · FUNDAE"
    )
    
    p = doc.add_paragraph()
    p.paragraph_format.space_after = Pt(12)
    run_p = p.add_run("Estimado/a cliente:\n\n"
                      "Para que podamos gestionar la bonificación del curso y que su importe sea deducido al 100% de los seguros sociales de tu empresa, la normativa de FUNDAE (Ley 30/2015) exige formalizar el documento de Adhesión a la Encomienda de Organización de la Formación.")
    run_p.font.name = 'Arial'
    run_p.font.size = Pt(10)

    style_section_heading(doc.add_paragraph(), "¿QUÉ ES LA ENCOMIENDA DE GESTIÓN?")
    p_faq1 = doc.add_paragraph()
    p_faq1.paragraph_format.space_after = Pt(10)
    run_faq1 = p_faq1.add_run("Es la autorización administrativa estándar mediante la cual tu empresa autoriza a la entidad organizadora oficial acreditada, FULL EQUIPE, S.L. (CIF B-85124428), a consultar el saldo de crédito anual disponible ante el aplicativo oficial del SEPE/FUNDAE y a comunicar telemáticamente el inicio y finalización del curso.")
    run_faq1.font.name = 'Arial'
    run_faq1.font.size = Pt(9.5)

    style_section_heading(doc.add_paragraph(), "¿TIENE ALGÚN COSTE O COMPROMISO?")
    p_faq2 = doc.add_paragraph()
    p_faq2.paragraph_format.space_after = Pt(10)
    run_faq2 = p_faq2.add_run("No. La consulta del crédito y la firma de la encomienda son totalmente gratuitas y no obligan a realizar ninguna formación si posteriormente decides no contratarla. Su única validez es habilitar el canal oficial de gestión con la Administración.")
    run_faq2.font.name = 'Arial'
    run_faq2.font.size = Pt(9.5)

    style_section_heading(doc.add_paragraph(), "PASOS PARA CUMPLIMENTAR EL DOCUMENTO:")
    steps = [
        ("1. Rellenar datos del representante legal:", "Nombre, apellidos y NIF del administrador o apoderado de la empresa."),
        ("2. Rellenar datos de la empresa cliente:", "Razón social completa, CIF y domicilio fiscal."),
        ("3. Indicar Cuenta de Cotización (CCC):", "La cuenta de cotización principal a la Seguridad Social."),
        ("4. Firma:", "Firma digital del representante legal (certificado digital de empresa) o firma manual con sello de la compañía."),
        ("5. Envío:", "Remitir el documento firmado para proceder a la comprobación del crédito.")
    ]
    
    for title, desc in steps:
        p_step = doc.add_paragraph()
        p_step.paragraph_format.left_indent = Inches(0.2)
        p_step.paragraph_format.space_after = Pt(4)
        r1 = p_step.add_run(f"• {title} ")
        r1.font.bold = True
        r1.font.size = Pt(9.5)
        r2 = p_step.add_run(desc)
        r2.font.size = Pt(9.5)

    p_contact = doc.add_paragraph()
    p_contact.paragraph_format.space_before = Pt(20)
    run_c = p_contact.add_run("¿Dudas con la cumplimentación? Contacta directamente con nosotros para resolver cualquier consulta sobre la tramitación.")
    run_c.font.bold = True
    run_c.font.color.rgb = COLOR_TEAL
    run_c.font.size = Pt(9.5)

    for out_docx in target_paths:
        os.makedirs(os.path.dirname(out_docx), exist_ok=True)
        doc.save(out_docx)
        print("Created:", out_docx)
        try:
            convert(out_docx)
            print("Converted PDF:", out_docx.replace(".docx", ".pdf"))
        except Exception as e:
            pass

def main():
    print("=== GENERANDO VERSIONES SIN LOGO (SIGFITO Y PLANTILLAS) ===")
    
    # 1. SIGFITO (en subcarpeta 'Versión Sin Logo' y en raíz con sufijo '(Sin Logo)')
    sig_dir = r"C:\Users\gyust\OneDrive - guillermoyuste.es\1. GYusteWebs\formai.es\5. Clientes y Formaciones\4. Sigfito - Noviembre 2026\2. Gestión FUNDAE"
    sig_sub = os.path.join(sig_dir, "Versión Sin Logo")
    
    build_sigfito_encomienda([
        os.path.join(sig_sub, "Encomienda curso formación - SIGFITO - Full Equipe.docx"),
        os.path.join(sig_dir, "Encomienda curso formación - SIGFITO - Full Equipe (Sin Logo).docx")
    ])
    
    build_sigfito_ficha_tecnica([
        os.path.join(sig_sub, "Ficha Técnica y Planificación - Microsoft Teams - SIGFITO.docx"),
        os.path.join(sig_dir, "Ficha Técnica y Planificación - Microsoft Teams - SIGFITO (Sin Logo).docx")
    ])
    
    build_sigfito_excel([
        os.path.join(sig_sub, "Datos necesarios para la bonificación - SIGFITO.xlsx"),
        os.path.join(sig_dir, "Datos necesarios para la bonificación - SIGFITO (Sin Logo).xlsx")
    ])
    
    # 2. PLANTILLAS OFICIALES (subcarpeta y raíz)
    base_tpl = r"C:\Users\gyust\OneDrive - guillermoyuste.es\1. GYusteWebs\formai.es\4. Gestión FUNDAE y Plantillas\Plantillas Oficiales FormAI"
    base_cld = r"C:\Users\gyust\OneDrive - guillermoyuste.es\1. GYusteWebs\formai.es\4.1 Documentos Clientes FormAI"
    
    # Encomienda
    build_plantilla_encomienda([
        os.path.join(base_tpl, "1. Encomienda de Gestión", "Versión Sin Logo", "Encomienda de Gestión - Full Equipe 2026.docx"),
        os.path.join(base_tpl, "1. Encomienda de Gestión", "Encomienda de Gestión - Full Equipe 2026 (Sin Logo).docx"),
        os.path.join(base_cld, "1. Encomienda de Gestión - Consulta Crédito", "Versión Sin Logo", "Encomienda de Gestión - Full Equipe 2026.docx")
    ])
    
    # Guía
    build_plantilla_guia([
        os.path.join(base_tpl, "1. Encomienda de Gestión", "Versión Sin Logo", "Guía de Firma - Encomienda de Gestión FUNDAE.docx"),
        os.path.join(base_tpl, "1. Encomienda de Gestión", "Guía de Firma - Encomienda de Gestión FUNDAE (Sin Logo).docx"),
        os.path.join(base_cld, "1. Encomienda de Gestión - Consulta Crédito", "Versión Sin Logo", "Guía de Firma - Encomienda de Gestión FUNDAE.docx")
    ])
    
    # Ficha Técnica
    build_plantilla_ficha_tecnica([
        os.path.join(base_tpl, "2. Datos y Planificación", "Versión Sin Logo", "Ficha Técnica y Planificación - Plantilla Full Equipe.docx"),
        os.path.join(base_tpl, "2. Datos y Planificación", "Ficha Técnica y Planificación - Plantilla Full Equipe (Sin Logo).docx"),
        os.path.join(base_cld, "2. Datos curso y participantes", "Versión Sin Logo", "Ficha Técnica y Planificación - Plantilla Full Equipe.docx")
    ])
    
    # Excel
    build_plantilla_excel([
        os.path.join(base_tpl, "2. Datos y Planificación", "Versión Sin Logo", "Datos necesarios para la bonificación - Full Equipe.xlsx"),
        os.path.join(base_tpl, "2. Datos y Planificación", "Datos necesarios para la bonificación - Full Equipe (Sin Logo).xlsx"),
        os.path.join(base_cld, "2. Datos curso y participantes", "Versión Sin Logo", "Datos necesarios para la bonificación - Full Equipe.xlsx")
    ])
    
    # Recibí Material
    build_plantilla_recibi([
        os.path.join(base_tpl, "3. Control de Asistencia y Material", "Versión Sin Logo", "RECIBÍ DE MATERIAL - Plantilla Full Equipe.docx"),
        os.path.join(base_tpl, "3. Control de Asistencia y Material", "RECIBÍ DE MATERIAL - Plantilla Full Equipe (Sin Logo).docx"),
        os.path.join(base_cld, "3. Asistencia y Material", "Versión Sin Logo", "RECIBÍ DE MATERIAL - Plantilla Full Equipe.docx")
    ])
    
    # Control Asistencia
    build_plantilla_asistencia([
        os.path.join(base_tpl, "3. Control de Asistencia y Material", "Versión Sin Logo", "CONTROL DE ASISTENCIA - Plantilla Full Equipe.docx"),
        os.path.join(base_tpl, "3. Control de Asistencia y Material", "CONTROL DE ASISTENCIA - Plantilla Full Equipe (Sin Logo).docx"),
        os.path.join(base_cld, "3. Asistencia y Material", "Versión Sin Logo", "CONTROL DE ASISTENCIA - Plantilla Full Equipe.docx")
    ])

    print("ALL NO-LOGO VERSIONS GENERATED SUCCESSFULLY!")

if __name__ == "__main__":
    main()
