�}[� r E  ���Z��F��a	����px�<�t����\��L̪sGoyy
�>����I��B>���)o��2�;j��#H9�HЈ�$���6.�3�$��%[�D�`�1|el�~� ��:���߂J&��и>7��ICt��BJ�d۰�
�?|���|��O0�=IE�+U0/Ot�UF��z�3��h�$�Z���(���@8���E�h���Z�>mcj�ʅFC���>JRt��s`.��h��	��\�IQ�y.��P����@kq�J���#H������ ѣ/��<�w��d�w@�+��F�=�!<�v��p� Z��ap�l�a� 5 ���`A��x�|�{D��Û��eK���C�^����5�=�?��B�ܦ�ߐЂ�j�y�e�l:�=^�}7�t�\ėI�gq��{�ds �1_�V�J��3�u1�W��������������ݼ��<�O��H��ʩ&tbz>�l�2�dt:�l�%�U!t!���r%���BJNc�X5�ok~�汖�$O��QM���i]�(n��н�3�������:��u�¤K���0�`�7<2��]���q���Wz�W��0�\D��F_�Lf���݄y�7��>�uR��b�H;��\:z�w�^���Қ��N�D�"�2�tn�'�����?a�_!&��_\�l^�!K���j���O��}*J=o�m��.���M��{,��}��ވ�\� �M�TK�d��9s�c �6��@{Al5:�Tqi`�f�`S���3�D-�w荠�D�
w�.��s�!B�)�U��U�`��QO���{ņ����G��Rl��gҟ�d[���9�>I⊾�F�Z��š`}i�㘏(�<�cmΓ>�B*�O�B^�hCj}f��Nb�[�.��[�����f��_��-p���B�Zy�/�1 �̯	t��D�ힻɺ���^}	�VE�Ψr�/)�M��}�>-(�����#R��N��Q�)5��0�i\�l�g	��q��}1n7��j�>$�����N�J�0�v_P�����w�}�e�:s�]�j��Z��6�ay��]��/�����	�m2��YN�߁�w�Y+�tjU@��`�x(:�W���_`?���ș.A�8ގ���4ťB����R2̊�<��F�cN[]��]h?RňR��Bs����jg��$�O����#+0O�zWg"��؟�t&�5��Q7�oFIy�#(��a��{�''�yi����5 ��<�<�kQ�>bY�q��ھ\U����I��Ĕ\<F����o���#v;�`h�lA��-�(|��ܰq��Q�[���Ө\T���h-y��U�O�P�����%V��a^���H��=3�.�r��;��b���-�� �Rw�X��JN2"`j��ʢASm2���Ka��%��.c��C��^�e?|^��#4�w�{}�P&>�P�TR���:;��~���j<g�e�؝jMcJ9d0��h��%O�&l�<F�c�u�����~O|^�5�)*����Mچ�7�g�	��7PG�-�y�K�wH�����!����@���}1,g�ӟ֎\x�LK޳gػ�R����E�Z�X/U���e��߸C�	BH�:�dJ�Oq�d��ڻ�|�S� m��#�� �w4���R���+���Ƀ��Ba�hL��w�%�s`B���3msjBO)��..�s��*K#8�Qf!|'U}�����Gq�Oƹ¯V!}����\;7�l�վ�.�[�z'�⳸�~qV��@�P5*p�jɨ0:�f�M.}�R��kX�9�G,�s�OHU��xΒ�o�2���#���޺X�4:��w.��'����h�$Q���[�s�>:��L�N@�}lU�I���d2-^�,lb jV�Mi|E����`�5kU^5�*��2
�:0�?oB��b�A/A�1�=+0GT��꽀�h��T�a�W��+F�>��(�s�x��^��.J�	XbD�N�ZG'�2J壮l����G���]�O�J ���!J�z8KM��%fh���<��ŧI���b�0�A�X��1c/���\gf�wBO�(����F;�i����)	���:�U��H�W�Ъu�2z����֭�;�4�Gm��ԼFOܿ{�'R@	��X�����{V<�mבg!��i�h䑙I0��O�t�wM�!�n��I��q�Q1�ðNe�'��읱wW�N�e3*)����>�-?R꘹T:���3$>�MމR��^��ѿ��;m1��!�$�|���*��&4B[(P+H�:�8��ۿ5��_*�I�cC�W��Z��2�	��S�n>�����"XFa��ΫWN�������)��~�F|�:�q��羦�X�!�f�#��{��\'xk��%~|u�(����Jk�)�r����E-C�����&ޙ�$d9�"�-h�ФC�襩n��"�$�"q���p�˦ǭ�˼�&���Y5�dU�+,��HP�V7ȥ. nK   CustomModel custom = obj as CustomModel;
                if (this.UpdateTime > custom.UpdateTime)
                {
                    result = -1;
                }
                else if (this.UpdateTime < custom.UpdateTime)
                {
                    result = 1;
                }
                return result;
            }
            catch (Exception ex) 
            { 
                throw new Exception(ex.Message); 
            }
        }
    }
}