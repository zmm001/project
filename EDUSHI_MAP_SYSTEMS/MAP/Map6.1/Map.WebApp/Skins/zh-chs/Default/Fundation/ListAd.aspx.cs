�}3� r �  ի�w֫Ў��a	��� �+^B޷}�o����LPԅt�Y�� ��?2LE��Hٯ��%��qQ����q���1Us�U�_�m����E����ۚ���z���}ʹ�O�)!���u���A�ٻ'{Եn
�g�hA)bqO�U�ɟlN��R���K���[<>��>jv�۷��O{���>ù>�$�ߏ���C�;�<���������y��h�x�w51���r�j�-���	�ǆ��}P蛎z[��R�f�#� K��<fH�#H������ ѣ/��<�w��d�w@�+��F�=�!<�v��p� Z��ap�l�a� 5 ���`A��x�|�{D��Û��eK���C�^����5�=�?��B�ܦ�ߐЂ�j�y�e�l:�=^�}7�t�\ėI�gq��{�ds �1_�V�J��3�u1�W��������������ݼ��<�O��H��ʩ&tbz>�l�2�dt:�l&�����uƕ�C���?j��ft0�K"���Ȫ��.���~H��F�5�����*Z4WT�a	��ܴE�K����x1�S1�{�u�,}*_>>��eo���%-�~|�߬e����
�$fb����Z<6�~t�v2Vޘ1s?̤����*xrF�����V���,Tو_]��_U]'�^s�=�_�Sl��o��I:n�۶�̀��=Χc�XA�;k�}b��T�Y*~^xVG���ӒYݐx�g��g�!����
�84��pU��a��������� Y�3(M�8D6�9���M���9Uϼ�@��K"-`l�"\�v� -��j{O��-�j܉��`oP<���iN��������e�~�%����R�G�5~:Έ� 2���Eq�6(~g~����l������p#��ʖ��Ꚛ:?���?^۰���bYY!;g���ڷϧ�F��`6��"&p������]���T�P���$��1�u�{�P�           { 
             adUrl += "&domid="+domid;  
            }

            //EDC.Framework.Tools.
            WebData wa = new WebData(adUrl,System.Text.Encoding.UTF8);

            if (wa.Success)
            {
                Response.Clear();
                string adContetnt = wa.PageContent;
                Response.Write(adContetnt);
                Response.End();
            }

        }

    }
}
