{{- define "hello-microservices.name" -}}
{{- default .Chart.Name .Values.nameOverride | trunc 63 | trimSuffix "-" -}}
{{- end -}}

{{- define "hello-microservices.fullname" -}}
{{- $name := default .Chart.Name .Values.nameOverride -}}
{{- if contains $name .Release.Name -}}
{{- .Release.Name | trunc 63 | trimSuffix "-" -}}
{{- else -}}
{{- printf "%s-%s" .Release.Name $name | trunc 63 | trimSuffix "-" -}}
{{- end -}}
{{- end -}}

{{- define "hello-microservices.chart" -}}
{{- printf "%s-%s" .Chart.Name .Chart.Version | replace "+" "_" | trunc 63 | trimSuffix "-" -}}
{{- end -}}

{{- define "hello-microservices.labels" -}}
app.kubernetes.io/instance: {{ .Release.Name }}
app.kubernetes.io/managed-by: {{ .Release.Service }}
app.kubernetes.io/name: {{ include "hello-microservices.name" . }}
app.kubernetes.io/part-of: {{ template "hello-microservices.name" . }}
app.kubernetes.io/version: "{{ .Chart.Version }}"
helm.sh/chart: {{ include "hello-microservices.chart" . }}
hello-microservices.io/version: {{ .Chart.AppVersion }}
{{- end -}}

{{- define "hello-microservices.secretname" -}}
    {{- include "hello-microservices.fullname" $}}-admin-secret
{{- end -}}

{{- define "hello-microservices.configname" -}}
    {{- include "hello-microservices.fullname" $}}-admin-config
{{- end -}}