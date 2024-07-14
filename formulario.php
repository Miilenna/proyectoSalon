<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Correo destinatario fijo
    $destinatario = "milena200.fv@gmail.com";
    $asunto = $_POST['asunto'];
    $mensaje = $_POST['mensaje'];
    $archivo = $_FILES['archivo'];

    // Verificar si el archivo fue subido sin errores
    if ($archivo['error'] == UPLOAD_ERR_OK) {
        // Obtener información del archivo
        $nombreArchivo = $archivo['name'];
        $tipoArchivo = $archivo['type'];
        $tamañoArchivo = $archivo['size'];
        $archivoTmp = $archivo['tmp_name'];

        // Leer el contenido del archivo
        $handle = fopen($archivoTmp, "r");
        $contenido = fread($handle, $tamañoArchivo);
        fclose($handle);

        // Codificar el contenido del archivo en base64
        $contenido = chunk_split(base64_encode($contenido));

        // Crear un límite para separar las partes del correo
        $limite = md5(uniqid(time()));

        // Encabezados del correo
        $headers = "From: no-reply@tu_dominio.com\r\n";
        $headers .= "Reply-To: no-reply@tu_dominio.com\r\n";
        $headers .= "MIME-Version: 1.0\r\n";
        $headers .= "Content-Type: multipart/mixed; boundary=\"$limite\"\r\n";

        // Mensaje
        $mensajeCorreo = "--$limite\r\n";
        $mensajeCorreo .= "Content-Type: text/plain; charset=\"UTF-8\"\r\n";
        $mensajeCorreo .= "Content-Transfer-Encoding: 7bit\r\n\r\n";
        $mensajeCorreo .= $mensaje . "\r\n\r\n";
        $mensajeCorreo .= "--$limite\r\n";
        $mensajeCorreo .= "Content-Type: $tipoArchivo; name=\"$nombreArchivo\"\r\n";
        $mensajeCorreo .= "Content-Transfer-Encoding: base64\r\n";
        $mensajeCorreo .= "Content-Disposition: attachment; filename=\"$nombreArchivo\"\r\n\r\n";
        $mensajeCorreo .= $contenido . "\r\n\r\n";
        $mensajeCorreo .= "--$limite--";

        // Enviar el correo
        if (mail($destinatario, $asunto, $mensajeCorreo, $headers)) {
            echo "Correo enviado con éxito.";
        } else {
            echo "Error al enviar el correo.";
        }
    } else {
        echo "Error al subir el archivo.";
    }
}
?>
