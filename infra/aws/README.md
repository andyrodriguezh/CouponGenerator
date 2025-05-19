# Infraestructura AWS para QR Coupon Generator

Este directorio contiene los recursos necesarios para desplegar la infraestructura en AWS para la aplicación QR Coupon Generator.

## Estructura

- `cloudformation-template.json`: Plantilla CloudFormation para crear recursos AWS

## Recursos AWS

La infraestructura incluye:

1. **DynamoDB Table (Coupons)**: Para almacenar información de cupones
2. **S3 Bucket**: Para almacenar imágenes y logos
3. **IAM Role**: Para permisos de Lambda

## Despliegue

### Prerrequisitos

- AWS CLI configurado con credenciales adecuadas
- Permisos para crear recursos CloudFormation, DynamoDB, S3 e IAM

### Pasos para desplegar

1. Navega a este directorio:

```bash
cd infra/aws
```

2. Despliega la plantilla CloudFormation:

```bash
aws cloudformation create-stack \
  --stack-name qr-coupon-generator \
  --template-body file://cloudformation-template.json \
  --capabilities CAPABILITY_IAM
```

3. Verifica el estado del despliegue:

```bash
aws cloudformation describe-stacks --stack-name qr-coupon-generator
```

4. Una vez completado el despliegue, obtén los nombres de los recursos:

```bash
aws cloudformation describe-stacks \
  --stack-name qr-coupon-generator \
  --query "Stacks[0].Outputs"
```

5. Configura los valores en las variables de entorno del proyecto:

```
REACT_APP_API_ENDPOINT=https://your-api-gateway-url.amazonaws.com/dev
REACT_APP_S3_BUCKET=your-bucket-name (de la salida del comando anterior)
REACT_APP_REGION=us-east-1 (o la región que hayas usado)
```

## Información adicional

Para implementar el backend completo, necesitarás:

1. Crear las funciones Lambda que interactuarán con DynamoDB
2. Configurar API Gateway para exponer esas funciones
3. Actualizar la configuración de CORS en todos los recursos

Consulta la documentación de AWS para más detalles sobre estos pasos.
