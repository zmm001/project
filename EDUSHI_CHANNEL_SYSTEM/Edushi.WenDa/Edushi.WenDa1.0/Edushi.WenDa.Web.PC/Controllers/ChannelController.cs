�}P� r 	  a>�+HP}���a	��%��px�<�t����\��L̷s�4(4\��O>1���ۄg�J���;j8m�ۂ���]<��q�J�%wU���0NJe�D�7�����K�ޟ�0�h$��P��Jr�C���3�6'�2���\�,e2��M��W%�V֭�
�Ċ͌[i�zoX���ṿ^���1��)"���>�$<HxlHi��Ǹճ��!����&QkG���-*����3��0;J@�!���T?���P}P�%y�`�~Y����J���&r�A �v�H�m�N�ˠͮ��.�ͽ!�=�!<�v��p� Z��ap�l�a� 5 ���`A��x�|�{D��Û��eK���C�^����5�=�?��B�ܦ�ߐЂ�j�y�e�l:�=^�}7�t�\ėI�gq��{�ds �1_�V�J��3�u1�W��������������ݼ��<�O��H��ʩ&tbz>�l�2�dt:�lD%T����D�(`8'�9�Mw��96��^���#+������	����&ś�y�J��3�7�\;������)�$�jOn! �p���7Z��x	�MX���un�׭7a��,�T./C��%�b
Eg'�*\���$^���Mp`��4:�'�\K��N`��f*߃�P���W�Fx��A%YV8�n��F<��s��M�8)��7X��U�Fk����y�sg�kH`��1V�&J�	�!�1oX������C�؛�����!���F�qK� ���
�\�P>��Pl�9y@�*��=q��-�	NѼv���9�l�8$�>{��{�<\���x�w,�\0N,㰄(oͽ%n9�Ѧ������3�b�@�I\O�|eT�#O�� 1��8�}W��&���ʑ6W��9�X���x��vϩ�]��N�#{����~G5�2� �Vm�b�"ܬғ8Wé�7�M~wʙ�Ni4�)���XBW��#&|nyZ�BE�$\zή�;���o��j�X}�lD(�V�	d��h�}�`Caܣpό� Fd�:рc0�H@.����}:�82I��Ī �:�whOg{�W�P�����V�������w
�g�b�WB���w\yE�x�Fug����P�dNh��Js�"A&�و��c�.ު%��'jw�.�ݯG����^{�S��MRKX*�%��*��sp}��u��4mre��j}U�\u;�X�F�ɛ���E���m:[vV.%f�o�ߝH^rJusV�e��� �Q�K���~P�u6<�F�xR>9���?^�J�h�,cZ���t>�F�cn�/P��4�C[�V��Ƅ�&ӊ��9���F�y�L+�}�8ۂ�����^3��P�~ �M���*�����V��&�,@�%�i��ԓ�сQ�[�����5�tC�*$����4钉~C}�D��*�����`��G����q!��x�J�b$��۫I�hTa���q&��%�&k{��� �(��h��+	�adC��l�-	>}Y�Ah1ݝ,�O��k|�u7s[rO`��e!����;������e��bG�߉\s(�(ys�	U��}�j&�躲ݖf:m?ңs�*���)s�����A�;?����g��"�J޳JE��_s	��Xr���G(J��g�7������)��,W��!1e��|z�o�J}I�~o�����'e�!�.VQ��;W��W��\��/x��k�p#��u���>&��f����q$R�}���{�B"�W4*�w�a6���޿LAԣ*�no[�0�&������S+w���q���>F4�a�E,���=�p��Q��4��9XG�Bక��_�r��$�]�;T��Z�O���_��q:FH���$��<J�Cc�.�3�ztVT����S΢f*��͠3()c�3���]j�c�'Ҋ�*K��$%�S7>k�,�E�E���wy�
�FZT��(?e_� Z�B��y�mKh4ִҶ�j�'�>�#'62�1��Y�_�l��~[%d�l�&^�?��FX��Q�����݆A�j?N_������$�����VgF�II?L���
�v������˱�FK�(�!�͵� �����Ò�?�<�j>=e��m�B<]�Ε�A���>j��2�{�Z�7m�/����cp�����B%ƕ�J��[��c�p'}=3����NU
����Uu��f��-��u�mv�KV$���A��5��_�\��#oMPQ�7�L c�
 X���4����1��!�t-����T�)�E	���m��H������\K�\Ќ�9��M�?Q.nywΉ�XT"�L��j�y��z[
2BWLQ{i��/�#C��8˹c�gńJ��X��eu��:]b\�]T~N#PM���Yw��֊:�c@"ն��H6r��
������n��)'��O�V���{��Z��YG]��
����m�t4P%M b�q����^9$�Jd�iր����O���T��`+�td"sf�%��[���                  model.WaitQuestions = waitQuestions.Take(pageSize).ToList();
                    model.PageCount = Convert.ToInt32(Math.Ceiling((double)waitQuestions.Count / pageSize));
                }
                viewPath = "~/Views/Channel/QuestionIndex.cshtml";
            }

            getTime.Stop();
            model.read_data_time = getTime.ElapsedMilliseconds;

            return View(viewPath, model);
        }


    }
}
