/**
 * =====================================================================
 * FORMAI - GESTOR DE LEADS & CRM (GOOGLE APPS SCRIPT BACKEND)
 * =====================================================================
 * Este script sustituye al anterior manteniendo el 100% de funcionalidades:
 * 1. Recepción de leads públicos desde la web (formulario / calculadora).
 * 2. Envío de notificación por email a hola@formai.es con enlace al Sheet.
 * 3. Gestión completa de CRM: estados, notas, edición, borrado, creación manual.
 * 4. Servicio de la Web App autónoma (Index.html) o API JSON.
 */

// Configuración
var NOTIFICATION_EMAIL = "hola@formai.es";

/**
 * Obtiene la hoja activa ("Respuestas" o la primera disponible)
 */
function getTargetSheet() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName("Respuestas") || 
              ss.getSheetByName("Respuestas de formulario 1") || 
              ss.getSheets()[0];
  ensureHeaders(sheet);
  return sheet;
}

/**
 * Asegura que existan todas las columnas sin tocar los datos previos:
 * A: Fecha | B: Nombre | C: Empresa | D: Email | E: Teléfono | F: Asunto | G: Mensaje | H: Estado | I: Comentarios | J: Prioridad | K: ID
 */
function ensureHeaders(sheet) {
  var headers = sheet.getRange(1, 1, 1, Math.max(sheet.getLastColumn(), 11)).getValues()[0];
  var expectedHeaders = [
    "Fecha", "Nombre", "Empresa", "Email", "Teléfono", "Asunto", "Mensaje",
    "Estado", "Comentarios", "Prioridad", "ID"
  ];
  
  var needsUpdate = false;
  for (var i = 0; i < expectedHeaders.length; i++) {
    if (!headers[i] || headers[i].toString().trim() === "") {
      headers[i] = expectedHeaders[i];
      needsUpdate = true;
    }
  }
  
  if (needsUpdate || sheet.getLastColumn() < expectedHeaders.length) {
    sheet.getRange(1, 1, 1, expectedHeaders.length).setValues([headers.slice(0, expectedHeaders.length)]);
    sheet.getRange(1, 1, 1, expectedHeaders.length).setFontWeight("bold").setBackground("#15798a").setFontColor("#ffffff");
  }
}

/**
 * doGet: Sirve la Web App interactiva o devuelve JSON
 */
function doGet(e) {
  var action = (e && e.parameter && e.parameter.action) ? e.parameter.action : "";
  
  if (action === "getLeads") {
    return createJsonResponse({
      result: "success",
      success: true,
      leads: fetchAllLeads()
    });
  }
  
  // Sirve la Web App en HTML
  return HtmlService.createHtmlOutputFromFile('Index')
    .setTitle('FormAI - Gestor de Leads')
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL)
    .addMetaTag('viewport', 'width=device-width, initial-scale=1');
}

/**
 * doPost: Procesa envíos de formulario público o acciones del CRM
 */
function doPost(e) {
  try {
    var data = {};
    if (e.postData && e.postData.contents) {
      data = JSON.parse(e.postData.contents);
    } else if (e.parameter) {
      data = e.parameter;
    }
    
    var action = data.action;
    var result = { result: "success", success: true };
    
    // Si no tiene 'action' o es 'createFromForm', es un lead del formulario de la web
    if (!action || action === "createFromForm") {
      result = processNewWebLead(data);
    } else {
      switch (action) {
        case "getLeads":
          result.leads = fetchAllLeads();
          break;
        case "updateStatus":
          result = updateLeadStatus(data.id, data.status);
          break;
        case "addComment":
          result = addLeadComment(data.id, data.comment, data.author);
          break;
        case "updateLead":
          result = updateLeadDetails(data.id, data.lead);
          break;
        case "deleteLead":
          result = deleteLeadById(data.id);
          break;
        case "createLead":
          result = insertNewLead(data, false); // Creación manual desde CRM (sin email si no se desea)
          break;
        default:
          result = processNewWebLead(data);
          break;
      }
    }
    
    return createJsonResponse(result);
  } catch (error) {
    return createJsonResponse({
      result: "error",
      success: false,
      error: error.toString()
    });
  }
}

/**
 * Procesa un nuevo lead del formulario público:
 * 1. Guarda en Google Sheets con ID y estado 'Nuevo'.
 * 2. Envía notificación por email a hola@formai.es.
 */
function processNewWebLead(data) {
  var sheet = getTargetSheet();
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var timestamp = new Date();
  var leadId = "lead_" + timestamp.getTime() + "_" + Math.floor(Math.random() * 1000);
  
  // 1. Guardar en la hoja de cálculo con columnas de gestión
  sheet.appendRow([
    timestamp,
    data.name || "",
    data.company || "",
    data.email || "",
    data.phone || "",
    data.subject || "",
    data.message || "",
    "Nuevo",     // Estado inicial
    "",          // Comentarios iniciales
    "Media",     // Prioridad inicial
    leadId       // ID único
  ]);
  
  // 2. Enviar notificación por email
  try {
    var emailRecipient = NOTIFICATION_EMAIL;
    var emailSubject = "🔥 Nuevo Lead Web: " + (data.name || "Sin nombre") + " (" + (data.company || "Sin empresa") + ")";
    
    var emailBody = "Hola,\n\n" +
                    "Se ha registrado un nuevo contacto desde el formulario de la web de FormAI:\n\n" +
                    "▪ Nombre: " + (data.name || "-") + "\n" +
                    "▪ Empresa: " + (data.company || "-") + "\n" +
                    "▪ Email: " + (data.email || "-") + "\n" +
                    "▪ Teléfono: " + (data.phone || "-") + "\n" +
                    "▪ Asunto: " + (data.subject || "-") + "\n" +
                    "▪ Mensaje:\n" + (data.message || "-") + "\n\n" +
                    "--------------------------------------------------\n" +
                    "Accede a la hoja de respuestas completa aquí:\n" +
                    ss.getUrl() + "\n\n" +
                    "Un saludo,\nEl sistema automático de FormAI";
    
    MailApp.sendEmail(emailRecipient, emailSubject, emailBody);
  } catch (mailError) {
    Logger.log("Error al enviar email de notificación: " + mailError.toString());
  }
  
  return {
    result: "success",
    success: true,
    id: leadId,
    message: "Lead registrado correctamente"
  };
}

/**
 * Inserta lead manual desde el CRM
 */
function insertNewLead(data, sendNotification) {
  var sheet = getTargetSheet();
  var timestamp = new Date();
  var leadId = "lead_" + timestamp.getTime() + "_" + Math.floor(Math.random() * 1000);
  
  var status = data.status || "Nuevo";
  var priority = data.priority || "Media";
  var comments = data.comments ? formatCommentsForCell(data.comments) : "";
  
  sheet.appendRow([
    timestamp,
    data.name || "",
    data.company || "",
    data.email || "",
    data.phone || "",
    data.subject || "",
    data.message || "",
    status,
    comments,
    priority,
    leadId
  ]);
  
  if (sendNotification) {
    processNewWebLead(data);
  }
  
  return {
    result: "success",
    success: true,
    id: leadId
  };
}

/**
 * Lee todos los leads de la hoja de cálculo
 */
function fetchAllLeads() {
  var sheet = getTargetSheet();
  var lastRow = sheet.getLastRow();
  if (lastRow <= 1) return [];
  
  var numCols = Math.max(sheet.getLastColumn(), 11);
  var data = sheet.getRange(2, 1, lastRow - 1, numCols).getValues();
  var leads = [];
  
  for (var i = 0; i < data.length; i++) {
    var row = data[i];
    var rowIndex = i + 2;
    
    // Si la fila está completamente vacía, saltar
    if (!row[1] && !row[3]) continue;
    
    var leadId = row[10] ? row[10].toString() : "lead_" + rowIndex + "_" + new Date().getTime();
    
    if (!row[10]) {
      sheet.getRange(rowIndex, 11).setValue(leadId);
    }
    
    var status = row[7] ? row[7].toString() : "Nuevo";
    var priority = row[9] ? row[9].toString() : "Media";
    
    leads.push({
      id: leadId,
      rowIndex: rowIndex,
      date: formatDate(row[0]),
      name: row[1] ? row[1].toString() : "",
      company: row[2] ? row[2].toString() : "",
      email: row[3] ? row[3].toString() : "",
      phone: row[4] ? row[4].toString() : "",
      subject: row[5] ? row[5].toString() : "",
      message: row[6] ? row[6].toString() : "",
      status: status,
      comments: parseComments(row[8]),
      priority: priority
    });
  }
  
  return leads.reverse();
}

/**
 * Actualiza el estado de un lead por su ID o Fila
 */
function updateLeadStatus(id, newStatus) {
  var sheet = getTargetSheet();
  var row = findRowById(sheet, id);
  if (row === -1) {
    return { result: "error", success: false, error: "Lead no encontrado" };
  }
  
  sheet.getRange(row, 8).setValue(newStatus);
  return { result: "success", success: true, id: id, newStatus: newStatus };
}

/**
 * Añade un comentario al historial del lead
 */
function addLeadComment(id, commentText, author) {
  var sheet = getTargetSheet();
  var row = findRowById(sheet, id);
  if (row === -1) {
    return { result: "error", success: false, error: "Lead no encontrado" };
  }
  
  var currentVal = sheet.getRange(row, 9).getValue().toString();
  var dateStr = Utilities.formatDate(new Date(), Session.getScriptTimeZone() || "GMT+1", "dd/MM/yyyy HH:mm");
  var authorName = author || "Admin";
  var newEntry = "[" + dateStr + " - " + authorName + "]: " + commentText;
  
  var updatedVal = currentVal ? currentVal + "\n" + newEntry : newEntry;
  sheet.getRange(row, 9).setValue(updatedVal);
  
  return {
    result: "success",
    success: true,
    id: id,
    comments: parseComments(updatedVal)
  };
}

/**
 * Actualiza los datos generales de un lead
 */
function updateLeadDetails(id, leadData) {
  var sheet = getTargetSheet();
  var row = findRowById(sheet, id);
  if (row === -1) {
    return { result: "error", success: false, error: "Lead no encontrado" };
  }
  
  if (leadData.name !== undefined) sheet.getRange(row, 2).setValue(leadData.name);
  if (leadData.company !== undefined) sheet.getRange(row, 3).setValue(leadData.company);
  if (leadData.email !== undefined) sheet.getRange(row, 4).setValue(leadData.email);
  if (leadData.phone !== undefined) sheet.getRange(row, 5).setValue(leadData.phone);
  if (leadData.subject !== undefined) sheet.getRange(row, 6).setValue(leadData.subject);
  if (leadData.message !== undefined) sheet.getRange(row, 7).setValue(leadData.message);
  if (leadData.status !== undefined) sheet.getRange(row, 8).setValue(leadData.status);
  if (leadData.priority !== undefined) sheet.getRange(row, 10).setValue(leadData.priority);
  
  return { result: "success", success: true, id: id, message: "Lead actualizado con éxito" };
}

/**
 * Elimina un lead por ID
 */
function deleteLeadById(id) {
  var sheet = getTargetSheet();
  var row = findRowById(sheet, id);
  if (row === -1) {
    return { result: "error", success: false, error: "Lead no encontrado" };
  }
  
  sheet.deleteRow(row);
  return { result: "success", success: true, id: id, message: "Lead eliminado" };
}

/**
 * Busca el número de fila por el ID del lead
 */
function findRowById(sheet, id) {
  var lastRow = sheet.getLastRow();
  if (lastRow <= 1) return -1;
  
  var ids = sheet.getRange(2, 11, lastRow - 1, 1).getValues();
  for (var i = 0; i < ids.length; i++) {
    if (ids[i][0] && ids[i][0].toString() === id.toString()) {
      return i + 2;
    }
  }
  
  if (!isNaN(id) && id >= 2 && id <= lastRow) {
    return parseInt(id, 10);
  }
  
  return -1;
}

/**
 * Parsea comentarios
 */
function parseComments(rawComments) {
  if (!rawComments) return [];
  var str = rawComments.toString().trim();
  if (!str) return [];
  
  var lines = str.split("\n");
  var parsed = [];
  
  for (var i = 0; i < lines.length; i++) {
    var line = lines[i].trim();
    if (!line) continue;
    
    var match = line.match(/^\[(.*?) - (.*?)\]: (.*)$/);
    if (match) {
      parsed.push({
        date: match[1],
        author: match[2],
        text: match[3]
      });
    } else {
      parsed.push({
        date: "",
        author: "Nota",
        text: line
      });
    }
  }
  return parsed;
}

function formatCommentsForCell(commentsArray) {
  if (Array.isArray(commentsArray)) {
    return commentsArray.map(function(c) {
      if (typeof c === "string") return c;
      return "[" + (c.date || "") + " - " + (c.author || "Admin") + "]: " + (c.text || "");
    }).join("\n");
  }
  return commentsArray.toString();
}

function formatDate(dateVal) {
  if (!dateVal) return "";
  if (dateVal instanceof Date) {
    return Utilities.formatDate(dateVal, Session.getScriptTimeZone() || "GMT+1", "dd/MM/yyyy HH:mm:ss");
  }
  return dateVal.toString();
}

function createJsonResponse(data) {
  return ContentService.createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}
