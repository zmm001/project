�}�� r N  O����C���a	��7��_N��}���C� F����ǿ�9�P|��H��-4|$�	�!�tB����Pz.?U��g�("����"��dk�
;� �T��z���(��F>��^�BDx=?��)�nB��,xt�sWΫ��Wl�[r��} ���h׋]
V�(&i�'Ζ��]�A�p;��>\]�d�����[�Ǿ��3�Uφo�ާ	/bhoV���s��P�b�]�ӂ����}�`��D�qu��2ul���i�q��]uv�k�e�c�/�m^����JgY����̬�8p�;��"���Eէ����l�F�+�~�\�H��t�ʹp�l�a� 5 ���`A��x�|�{D��Û��eK���C�^����5�=�?��B�ܦ�ߐЂ�j�y�e�l:�=^�}7�t�\ėI�gq��{�ds �1_�V�J��3�u1�W��������������ݼ��<�O��H��ʩ&tbz>�l�2�dt:�l02&k���-+j�<�Y�F��;���}�������-0��N�r(�?�TA#�J��M�|�M�r��6F�1�>l.���%EMƝ���ؙ{fg�|O��������6T�U2z3�������z1s׻z۱��S:Ԫv��m
I��Ў�v��lUx�;�r���}�CAޟ�h��M�e��=޳}]<#���ԩz�~���2�;.�Nq$����^�Ƭ���ވ�j$ g���a$h��ђ�X��}����7�q��/���QH�dϝ=���#@_̨ƍ:�l��'� ��{fl��!�;�J�y a��⓼.m��m��Av�n	�E��b~0,�����Y��g�|<�:ެsygl�f����Y��땛~8�Q5E�!�1Ss�R���p�#�M}陫ʹ�ːD�f�_�0W�mF����Z�&�V�F�NY�~0mv��P��Fy.A[���9l� �!�>���A���@W��pګA�x� ����j(���F�?��V)uj�1��x��lD.��K�	0�^c��f�-�r������b��f#��`e^W�)�7Y�# ���΢�Ru&}=��A3�� ɬSˏ}�[��6U�D�}�χ%ViC�/���mS&W���A?�l��.�]O��{����*n��9�_�� ���:��!�SУ4�����h|��;L�)�tiC�Nd��mk����,����V���S��Ɵ5�f��O!��ߧ,�H[�6丘;��_f��w���*�tO,�g�|^^^�����g��cL ��ؠ�C�"-�*%�S`�����|�a���g��kih|,'JC�^�
=`H�$۞�r��g~BR�
�@�;�$�\���
������r�j� ��'�ԣ,�WPk� �Դ�1q��z(x��C⻭V�yM�mnr�������B"&t�6��B�V��v��R�á ����+�^%��υ���Ҟ��	f
�g��U;�(�B�j�)´��G��;$n,Z�W$��� �� ���4u��S[�lD$9�1K})�y�����`��T�4��g�$��O:ȧ$��N�D����=3��\�����ɕ�"��j-�}�n�r�c��ڢI-z޴H����0�I�<�	�yG��#��#�=�	���nr���7�y�����8a��t ����p�8���F�u[����=ǝ��������=�䌞P XOG��!k��a���Eo�/��5k7�y�.���/�$��V�2r���ƃ��Ǔ�U������,=��3�X>ƹ�L�zж�Cx�?�!|48�1Ɩ�ċ���^؝z3e��
��((K��I$�2y
r{"7����mT��{ ����EoT�v���D�}ä�h��P�@�_>9c�����$|�B:�U�7&y]��";��Wv'������v�;��0��ў�y�|Z9�����Da���o��������9�,��V�L�SB��UѾ����qlX2�pVN0�k���S5��Zr��
�e��� (��j�l�+���U�q��K�3��+?s,��OA0MZv���b��%IO�N4~�C�f�}� �L�t����ʺ���N��6�X�V�-ܯ�,��:��X��;�Ű��M�p��h݌@_���L��'4�y����2��IK�V4�|�NCT���X��օa���ŏ^�W߲��s�a\L�!��efc���C^���FI&T������ln�b[>�Bjn� ��E�B�b~׊��nnz]t��^c�i����:��DΞn:�P.��^��^�DVaLaE�S;)�8���@B��=3w����A
�9�ox�V�ӑ瑭���AQ�O��C�����NrW;
���ɯxX�ɽe,smA_�Pȟai�G��ً#3v�~,�B��]�N�14̾���K����i|���ʹ:���Ҡbf/`t���w]�v�.וY�!!<�j]����49�c2/��k@�H�ϥ��wU�w潗��wP��b�ى���Q��'���S�8�j(field);
				oprot.WriteString(Message);
				oprot.WriteFieldEnd();
			}

			field.Name = "type";
			field.Type = TType.I32;
			field.ID = 2;
			oprot.WriteFieldBegin(field);
			oprot.WriteI32((int)type);
			oprot.WriteFieldEnd();
			oprot.WriteFieldStop();
			oprot.WriteStructEnd();
		}

		public enum ExceptionType
		{
			Unknown,
			UnknownMethod,
			InvalidMessageType,
			WrongMethodName,
			BadSequenceID,
			MissingResult
		}
	}
}
