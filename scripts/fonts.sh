#!/bin/sh
# The site's two families, self-hosted and subset (OFL-1.1, assets/fonts/OFL-*.txt). Run with fontTools + brotli on
# PATH (pip install fonttools brotli) and the upstream files of google/fonts in $1:
#   Newsreader[opsz,wght].ttf, Newsreader-Italic[opsz,wght].ttf, FragmentMono-Regular.ttf
# Newsreader keeps its optical-size axis whole and its weight axis from 300 to 700; the text figures, the tabular
# lining figures, small caps where the font has them, and its kerning stay.
set -e
SRC=${1:?folder of the upstream ttf files}
OUT=$(dirname "$0")/../assets/fonts
U="U+0020-007E,U+00A0-00FF,U+0131,U+0152-0153,U+02C6,U+02DA,U+02DC,U+2002-2014,U+2018-201E,U+2020-2022,U+2026,U+2032-2033,U+2039-203A,U+2070-2079,U+2080-2089,U+20AC,U+2116,U+2122,U+2190-2193,U+2212,U+2248,U+2260,U+2264-2265,U+00B2-00B3,U+00B5,U+00A7,U+00B6,U+00D7,U+00B7"
F="kern,liga,clig,calt,onum,lnum,tnum,pnum,smcp,c2sc,frac,sups,subs,case,ss01"
for pair in "Newsreader[opsz,wght].ttf:newsreader" "Newsreader-Italic[opsz,wght].ttf:newsreader-italic"; do
  in=${pair%%:*}; out=${pair##*:}
  fonttools varLib.instancer "$SRC/$in" wght=300:700 -o "/tmp/$out.ttf" -q
  pyftsubset "/tmp/$out.ttf" --unicodes="$U" --layout-features="$F" --flavor=woff2 --output-file="$OUT/$out.woff2"
done
pyftsubset "$SRC/FragmentMono-Regular.ttf" --unicodes="$U" --layout-features="$F" --flavor=woff2 --output-file="$OUT/fragment-mono.woff2"
