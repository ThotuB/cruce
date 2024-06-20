package logger

import (
	"os"

	"go.uber.org/zap"
	"go.uber.org/zap/zapcore"
)

type Logger interface {
	Debug(args ...interface{})
	Debugf(template string, args ...interface{})
	Info(args ...interface{})
	Infof(template string, args ...interface{})
	Warn(args ...interface{})
	Warnf(template string, args ...interface{})
	Error(args ...interface{})
	Errorf(template string, args ...interface{})
	Panic(args ...interface{})
	Panicf(template string, args ...interface{})
	Fatal(args ...interface{})
	Fatalf(template string, args ...interface{})
	DPanic(args ...interface{})
	DPanicf(template string, args ...interface{})
}

type logger struct {
	sugar *zap.SugaredLogger
}

func New() *logger {
	return &logger{}
}

func (l *logger) Init() {
	encoderConfig := zap.NewProductionEncoderConfig()
	encoderConfig.LevelKey = "LEVEL"
	encoderConfig.EncodeLevel = zapcore.CapitalColorLevelEncoder
	encoderConfig.TimeKey = "TIME"
	encoderConfig.EncodeTime = zapcore.TimeEncoderOfLayout("15:04:05.000")
	encoderConfig.MessageKey = "MESSAGE"
	encoderConfig.CallerKey = "CALLER"
	encoderConfig.EncodeCaller = zapcore.ShortCallerEncoder
	encoderConfig.NameKey = "NAME"

	encoder := zapcore.NewConsoleEncoder(encoderConfig)
	logWriter := zapcore.AddSync(os.Stdout)

	core := zapcore.NewCore(encoder, logWriter, zapcore.DebugLevel)
	// logger := zap.New(core, zap.AddCaller(), zap.AddCallerSkip(1))
	logger := zap.New(core)

	l.sugar = logger.Sugar()
	if err := l.sugar.Sync(); err != nil {
		l.sugar.Warn("sugar.Sync: ", err)
	}
}

func (l *logger) Debug(args ...interface{}) {
	l.sugar.Debug(args...)
}

func (l *logger) Debugf(template string, args ...interface{}) {
	l.sugar.Debugf(template, args...)
}

func (l *logger) Info(args ...interface{}) {
	l.sugar.Info(args...)
}

func (l *logger) Infof(template string, args ...interface{}) {
	l.sugar.Infof(template, args...)
}

func (l *logger) Warn(args ...interface{}) {
	l.sugar.Warn(args...)
}

func (l *logger) Warnf(template string, args ...interface{}) {
	l.sugar.Warnf(template, args...)
}

func (l *logger) Error(args ...interface{}) {
	l.sugar.Error(args...)
}

func (l *logger) Errorf(template string, args ...interface{}) {
	l.sugar.Errorf(template, args...)
}

func (l *logger) Panic(args ...interface{}) {
	l.sugar.Panic(args...)
}

func (l *logger) Panicf(template string, args ...interface{}) {
	l.sugar.Panicf(template, args...)
}

func (l *logger) Fatal(args ...interface{}) {
	l.sugar.Fatal(args...)
}

func (l *logger) Fatalf(template string, args ...interface{}) {
	l.sugar.Fatalf(template, args...)
}

func (l *logger) DPanic(args ...interface{}) {
	l.sugar.DPanic(args...)
}

func (l *logger) DPanicf(template string, args ...interface{}) {
	l.sugar.DPanicf(template, args...)
}
