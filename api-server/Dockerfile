FROM golang:1.20 AS builder

ARG TARGETOS=linux
ARG TARGETARCH

COPY . /api-server
WORKDIR /api-server

ENV GOOS=${TARGETOS} \
    GOARCH=${TARGETARCH}

RUN go env
RUN go mod tidy
RUN CGO_ENABLED=0 go build -o /output/server -v

## DEPLOY STAGE
FROM alpine:latest
WORKDIR /deploy
COPY --from=builder /output/server /deploy
CMD ["/deploy/server"]

EXPOSE 8080